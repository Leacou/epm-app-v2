import { useState, useCallback } from "react";

// Helpers de localStorage
function setLS(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function getLS(key) { const data = localStorage.getItem(key); return data ? JSON.parse(data) : null; }
function removeLS(key) { localStorage.removeItem(key); }

function getAccessTokenFromHash() {
  const hash = window.location.hash.substring(1);
  let token = null;
  let longLivedToken = null;
  hash.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    if (key === 'long_lived_token') longLivedToken = decodeURIComponent(value ?? '');
    if (key === 'access_token') token = decodeURIComponent(value ?? '');
  });
  if (longLivedToken) token = longLivedToken;
  if (!token) token = localStorage.getItem('epm_access_token');
  if (token && !localStorage.getItem('epm_access_token')) localStorage.setItem('epm_access_token', token);
  return token;
}

async function fetchFacebookAPI(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (data.error && data.error.code === 190) {
    removeLS("epm_access_token");
    removeLS("epm_facebook_profile");
    removeLS("epm_instagram_accounts");
    removeLS("epm_selected_instagram_id");
    removeLS("epm_instagram_profile");
    throw new Error("Token expirado");
  }
  return data;
}

export function useFacebookLogin() {
  const [loading, setLoading] = useState(false);
  const [fbProfile, setFbProfile] = useState(() => getLS("epm_facebook_profile"));
  const [igProfile, setIgProfile] = useState(() => getLS("epm_instagram_profile"));
  const [error, setError] = useState(null);

  const login = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAccessTokenFromHash();
      if (!token) throw new Error("No hay access_token");

      // 1. Perfil Facebook
      const fbFields = "id,name,email,picture";
      const fbUrl = `https://graph.facebook.com/v23.0/me?fields=${fbFields}&access_token=${token}`;
      const fb = await fetchFacebookAPI(fbUrl);
      setLS("epm_facebook_profile", fb);
      setFbProfile(fb);

      // 2. Instagram asociado
      const pagesUrl = `https://graph.facebook.com/v23.0/me/accounts?fields=id,name,instagram_business_account&access_token=${token}`;
      const pages = await fetchFacebookAPI(pagesUrl);
      let ig = null;
      if (pages.data && Array.isArray(pages.data)) {
        const igAccount = pages.data.find(page => page.instagram_business_account && page.instagram_business_account.id);
        if (igAccount) {
          const igId = igAccount.instagram_business_account.id;
          const igUrl = `https://graph.facebook.com/v23.0/${igId}?fields=id,username,profile_picture_url,name&access_token=${token}`;
          ig = await fetchFacebookAPI(igUrl);
        }
      }
      if (ig) {
        setLS("epm_instagram_profile", ig);
        setIgProfile(ig);
      } else {
        removeLS("epm_instagram_profile");
        setIgProfile(null);
      }

      // 3. Enviar ambos al backend
      if (fb && fb.id) {
        const payload = {
          fb_id: fb.id,
          fb_email: fb.email,
          fb_name: fb.name,
          fb_picture: fb.picture?.data?.url || null,
          accessToken: token,
          ig_id: ig ? ig.id : null,
          ig_username: ig ? ig.username : null,
          ig_name: ig ? ig.name : null,
          ig_picture: ig ? ig.profile_picture_url : null
        };
        await fetch(`https://epm-app-v2.onrender.com/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }
      setLoading(false);
    } catch (err) {
      setError(err.message || "Ocurrió un error");
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fbProfile,
    igProfile,
    login
  };
}
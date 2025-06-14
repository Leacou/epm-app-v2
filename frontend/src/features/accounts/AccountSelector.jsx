import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/auth";

const AccountSelector = () => {
  const [igAccounts, setIgAccounts] = useState([]);
  const [fbProfile, setFbProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      // Redirige si no hay token (previene loops y UX confusa)
      window.location.replace("/");
      return;
    }
    setTokenChecked(true);

    // 1. Traer perfil de Facebook
    const fbFields = "id,name,email,picture";
    const fbUrl = `https://graph.facebook.com/v23.0/me?fields=${fbFields}&access_token=${token}`;
    fetch(fbUrl)
      .then(res => res.json())
      .then(profile => {
        setFbProfile(profile);

        // 2. Traer todas las páginas administradas y sus cuentas de IG asociadas
        const pagesUrl = `https://graph.facebook.com/v23.0/me/accounts?fields=id,name,instagram_business_account&access_token=${token}`;
        return fetch(pagesUrl).then(res => res.json());
      })
      .then(async pagesResult => {
        if (pagesResult.data && Array.isArray(pagesResult.data)) {
          // Array de promesas para traer cuentas de IG
          const igPromises = pagesResult.data
            .filter(page => page.instagram_business_account && page.instagram_business_account.id)
            .map(page => {
              const igId = page.instagram_business_account.id;
              const igUrl = `https://graph.facebook.com/v23.0/${igId}?fields=id,username,profile_picture_url,name&access_token=${token}`;
              return fetch(igUrl).then(res => res.json());
            });

          const igAccountsData = await Promise.all(igPromises);
          setIgAccounts(igAccountsData);
        } else {
          setIgAccounts([]);
        }
      })
      .catch(() => {
        setError("Error obteniendo cuentas de Instagram.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (!tokenChecked) return null; // Evita parpadeo antes de decidir si hay token

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Selecciona tu cuenta de Instagram</h2>
      {loading && <p>Cargando cuentas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fbProfile && (
        <div style={{ marginBottom: 16 }}>
          <p>¡Hola, {fbProfile.name}!</p>
          {fbProfile.picture?.data?.url && (
            <img src={fbProfile.picture.data.url} alt="FB" width={48} style={{ borderRadius: "50%" }} />
          )}
        </div>
      )}
      <div>
        {igAccounts.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {igAccounts.map(ig => (
              <li key={ig.id} style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
                <img
                  src={ig.profile_picture_url}
                  alt={ig.username}
                  width={48}
                  height={48}
                  style={{ borderRadius: "50%", marginRight: 16 }}
                />
                <div>
                  <strong>@{ig.username}</strong>
                  <div>{ig.name}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No hay cuentas de Instagram asociadas a tu Facebook.</p>
        )}
      </div>
    </div>
  );
};

export default AccountSelector;
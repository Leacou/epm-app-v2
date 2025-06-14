import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/auth";

const AccountSelector = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [igAccounts, setIgAccounts] = useState([]);
  const [fbProfile, setFbProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getAccessToken();
    setAccessToken(token);
    if (!token) return;

    setLoading(true);
    setError(null);

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
      .catch(err => {
        setError("Error obteniendo cuentas de Instagram.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Selecciona tu cuenta de Instagram</h2>
      {loading && <p>Cargando cuentas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fbProfile && (
        <div>
          <p>¡Hola, {fbProfile.name}!</p>
          <img src={fbProfile.picture?.data?.url} alt="FB" width={48} />
        </div>
      )}
      <div>
        {igAccounts.length > 0 ? (
          <ul>
            {igAccounts.map(ig => (
              <li key={ig.id}>
                <strong>@{ig.username}</strong> - {ig.name}
                <br />
                <img src={ig.profile_picture_url} alt={ig.username} width={48} />
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
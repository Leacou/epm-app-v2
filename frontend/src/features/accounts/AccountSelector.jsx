import React, { useEffect, useState } from "react";

const AccountSelector = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Facebook devuelve el access_token en el hash de la URL: #access_token=XXX
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const token = params.get("access_token");
    setAccessToken(token);

    // Aquí luego puedes usar el token para pedir las cuentas de Instagram conectadas
  }, []);

  return (
    <div>
      <h2>Selecciona tu cuenta de Instagram</h2>
      {accessToken ? (
        <div>
          <p>Access Token: {accessToken.substring(0, 20)}...</p>
          {/* Aquí irán las cuentas */}
        </div>
      ) : (
        <p>No se encontró access token.</p>
      )}
    </div>
  );
};

export default AccountSelector;
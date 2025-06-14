import React, { useEffect } from "react";
import { useFacebookLogin } from "../hooks/useFacebookLogin";

export default function Accounts() {
  const { loading, error, fbProfile, igProfile, login } = useFacebookLogin();

  useEffect(() => {
    login();
    // Limpiar el hash de la URL después de procesar
    window.history.replaceState(null, '', window.location.pathname);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {loading && <p>Cargando datos desde Facebook...</p>}
      {error && <p style={{color: "red"}}>{error}</p>}
      {fbProfile && (
        <div>
          <h2>¡Sesión iniciada como {fbProfile.name}!</h2>
          <img src={fbProfile.picture?.data?.url} alt="Perfil Facebook" />
        </div>
      )}
      {igProfile && (
        <div>
          <h3>Instagram asociado: @{igProfile.username}</h3>
          <img src={igProfile.profile_picture_url} alt="Instagram Profile" />
        </div>
      )}
    </div>
  );
}
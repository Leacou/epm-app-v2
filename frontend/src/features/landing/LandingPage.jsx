import React, { useEffect, useState } from "react";
import { getFacebookLoginUrl } from "../../api/facebook";

export default function LandingPage() {
  const [token, setToken] = useState(localStorage.getItem("epm_access_token"));

  useEffect(() => {
    // Si volvemos del login de FB e incluye el token en el hash
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.replace("#", ""));
      const newToken = params.get("long_lived_token") || params.get("access_token");
      if (newToken) {
        localStorage.setItem("epm_access_token", newToken);
        setToken(newToken);
        // Limpia el hash
        window.location.hash = "";
        // Redirige a /accounts
        window.location.replace("/accounts");
      }
    }
  }, []);

  const handleLogin = () => {
    window.location.href = getFacebookLoginUrl();
  };

  if (!token) {
    // No hay token: muestra el botón de login
    return (
      <div className="landing">
        <h1>Bienvenido a LALOKJA</h1>
        <p>Tu centro de control para Instagram</p>
        <button onClick={handleLogin}>Iniciar sesión con Facebook</button>
      </div>
    );
  }

  // Si hay token: muestra un mensaje y podrías redirigir automáticamente si quieres
  return (
    <div className="landing">
      <h1>Bienvenido a LALOKJA</h1>
      <p>¡Ya estás logueado!</p>
    </div>
  );
}
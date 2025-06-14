import React, { useEffect, useState } from "react";
import { getFacebookLoginUrl } from "../../api/facebook";
import AppLayout from "../../components/AppLayout";

export default function LandingPage() {
  const [token, setToken] = useState(localStorage.getItem("epm_access_token"));

  useEffect(() => {
    // Extrae el token del hash tras login de FB
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.replace("#", ""));
      const newToken = params.get("long_lived_token") || params.get("access_token");
      if (newToken) {
        localStorage.setItem("epm_access_token", newToken);
        setToken(newToken);
        window.location.hash = "";
        window.location.replace("/accounts");
      }
    } else if (token) {
      // Si ya estás logueado, redirige automáticamente a /accounts
      window.location.replace("/accounts");
    }
  }, [token]);

  const handleLogin = () => {
    window.location.href = getFacebookLoginUrl();
  };

  if (!token) {
    return (
      <AppLayout>
        <div className="landing" style={{ textAlign: "center", marginTop: "3rem" }}>
          <h1>Bienvenido a LALOKJA</h1>
          <p>Tu centro de control para Instagram</p>
          <button onClick={handleLogin}>Iniciar sesión con Facebook</button>
        </div>
      </AppLayout>
    );
  }

  // Si hay token, mientras redirige puedes mostrar un loader o nada
  return (
    <AppLayout>
      <div className="landing" style={{ textAlign: "center", marginTop: "3rem" }}>
        <h1>Bienvenido a LALOKJA</h1>
        <p>Redirigiendo a tus cuentas...</p>
      </div>
    </AppLayout>
  );
}
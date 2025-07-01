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
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Bienvenido a EPM App</h1>
          <p>Tu plataforma de analíticas de Instagram</p>
          <button
            onClick={handleLogin}
            style={{
              backgroundColor: "#1877f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "0.75rem 1.5rem",
              fontSize: "1.1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              marginTop: "1.5rem",
            }}
          >
            {/* Facebook SVG Logo */}
            <svg height="24" viewBox="0 0 24 24" fill="white" width="24" aria-hidden="true">
              <rect width="24" height="24" rx="4" fill="#1877f3"/>
              <path
                d="M17.525 14.09l.442-2.878h-2.75V9.152c0-.788.385-1.557 1.62-1.557h1.255V5.204s-1.14-.195-2.233-.195c-2.278 0-3.77 1.381-3.77 3.878v2.325H7.5v2.878h2.59V21h3.127v-6.91h2.308z"
                fill="white"
              />
            </svg>
            Iniciar sesión con Facebook
          </button>
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
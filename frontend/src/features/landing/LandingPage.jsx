import React from "react";
import { getFacebookLoginUrl } from "../../api/facebook";

const LandingPage = () => {
  const handleLogin = () => {
    window.location.href = getFacebookLoginUrl();
  };

  return (
    <div className="landing">
      <h1>Bienvenido a LALOKJA</h1>
      <p>Tu centro de control para Instagram</p>
      <button onClick={handleLogin}>Iniciar sesión con Facebook</button>
    </div>
  );
};

export default LandingPage;
import React from "react";
import AppRoutes from "./routes/AppRoutes";

if (window.location.pathname === "/index.html") {
  // Redirige a "/" conservando el hash
  window.location.replace("/" + window.location.hash);
}

function App() {
  return <AppRoutes />;
}

export default App;
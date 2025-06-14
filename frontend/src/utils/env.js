// Detecta si el entorno es desarrollo usando el query param ?dev=1
export function isDev() {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("dev") === "1";
  }
  
  // Devuelve la URI de redirección según el entorno
  export function getRedirectUri() {
    if (isDev()) {
      return "http://localhost:5173/accounts?dev=1"; // O donde tengas tu selector de cuentas
    } else {
      return "https://app.epm-marketing.com/accounts";
    }
  }
import { getRedirectUri } from "../utils/env";

// Datos de Facebook App
const FB_CLIENT_ID = "493451440039423";
const FB_SCOPES = "public_profile,email,instagram_basic,instagram_manage_insights"; // Ajusta scopes según necesidad

export function getFacebookLoginUrl() {
  const redirectUri = getRedirectUri();
  const params = new URLSearchParams({
    client_id: FB_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "token",
    scope: FB_SCOPES,
    state: "lalojka-" + Math.random().toString(36).substring(2),
  });
  return `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;
}
import fetchInstagramData from './fetchInstagramData';

// Esta función hace el fetch y filtrado de los últimos 30 días
export default async function getLast30DaysReport() {
  const userToken = localStorage.getItem('epm_access_token');
  const igProfile = JSON.parse(localStorage.getItem('epm_instagram_profile'));
  if (!userToken || !igProfile) throw new Error('Tokens no disponibles');

  // Endpoint y lógica específica de Facebook API
  const endpoint = `https://graph.facebook.com/v18.0/${igProfile.ig_id}/insights?metric=impressions,reach,profile_views,website_clicks&period=day&since=${fechaInicio}&until=${fechaFin}&access_token=${userToken}`;

  const data = await fetchInstagramData(endpoint);

  // ...Filtrado y formateo de data...

  return data; // ya listo para graficar
}
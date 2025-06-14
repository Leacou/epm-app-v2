// Calcula fechas UNIX para los últimos N días
function getUnixDateNDaysAgo(n) {
    const now = new Date();
    now.setDate(now.getDate() - n);
    return Math.floor(now.getTime() / 1000);
  }
  
  export default async function getLast30DaysReport() {
    const userToken = localStorage.getItem('epm_access_token');
    const igProfile = JSON.parse(localStorage.getItem('epm_instagram_profile'));
    if (!userToken || !igProfile) throw new Error('Tokens no disponibles');
  
    const metrics = [
      'views','reach','profile_views','website_clicks',
      'likes','comments','shares','replies','accounts_engaged'
    ];
  
    const since = getUnixDateNDaysAgo(30);
    const until = getUnixDateNDaysAgo(0);
  
    const endpoint = `https://graph.facebook.com/v20.0/${igProfile.id}/insights?metric=${metrics.join(',')}&period=day&since=${since}&until=${until}&metric_type=total_value&access_token=${userToken}`;
  
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Error al consultar la API de Instagram');
    const data = await response.json();
  
    // Procesa la data para el gráfico (formato: [{date, impressions, reach, ...}])
    const dateMap = {};
    if (data.data) {
      data.data.forEach(metric => {
        metric.values.forEach(entry => {
          const date = entry.end_time.slice(0, 10); // YYYY-MM-DD
          if (!dateMap[date]) dateMap[date] = { date };
          dateMap[date][metric.name] = entry.value ?? entry.total_value?.value ?? null;
        });
      });
    }
    const chartData = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date));
  
    return chartData;
  }
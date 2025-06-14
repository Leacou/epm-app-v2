function getUnixDateNDaysAgo(n) {
    const now = new Date();
    now.setDate(now.getDate() - n);
    return Math.floor(now.getTime() / 1000);
  }
  
  export default async function getLast30DaysReport() {
    const userToken = localStorage.getItem('epm_access_token');
    const igProfileRaw = localStorage.getItem('epm_instagram_profile');
    console.log("Token:", userToken);
    console.log("Raw Instagram Profile:", igProfileRaw);
  
    let igProfile;
    try {
      igProfile = JSON.parse(igProfileRaw);
    } catch (e) {
      console.log("Error al parsear el perfil IG:", e);
      throw new Error('Perfil de Instagram no válido');
    }
    if (!userToken || !igProfile) throw new Error('Tokens no disponibles');
  
    const metrics = [
      'views','reach','profile_views','website_clicks',
      'likes','comments','shares','replies','accounts_engaged'
    ];
  
    const since = getUnixDateNDaysAgo(30);
    const until = getUnixDateNDaysAgo(0);
  
    const igId = igProfile.ig_id || igProfile.id;
    const endpoint = `https://graph.facebook.com/v20.0/${igId}/insights?metric=${metrics.join(',')}&period=day&since=${since}&until=${until}&metric_type=total_value&access_token=${userToken}`;
    console.log("API Endpoint:", endpoint);
  
    const response = await fetch(endpoint);
    console.log("Response OK?", response.ok);
    const data = await response.json();
    console.log("API Response data:", data);
  
    const dateMap = {};
    if (data.data && Array.isArray(data.data)) {
      data.data.forEach(metric => {
        if (Array.isArray(metric.values)) {
          metric.values.forEach(entry => {
            const date = entry.end_time.slice(0, 10); // YYYY-MM-DD
            if (!dateMap[date]) dateMap[date] = { date };
            dateMap[date][metric.name] = entry.value ?? null;
          });
        }
      });
    }
    const chartData = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date));
    console.log("chartData:", chartData);
    return chartData || [];
  }
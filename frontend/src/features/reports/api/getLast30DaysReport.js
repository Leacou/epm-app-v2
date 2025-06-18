function getUnixDateNDaysAgo(n) {
    const now = new Date();
    now.setDate(now.getDate() - n);
    return Math.floor(now.getTime() / 1000);
  }
  
  export default async function getLast30DaysReport() {
    const userToken = localStorage.getItem('epm_access_token');
    const igProfileRaw = localStorage.getItem('epm_instagram_profile');
  
    let igProfile;
    try {
      igProfile = JSON.parse(igProfileRaw);
    } catch (e) {
      throw new Error('Perfil de Instagram no válido');
    }
    if (!userToken || !igProfile) throw new Error('Tokens no disponibles');
  
    const metrics = [
      'views','reach','profile_views','website_clicks',
      'likes','comments','shares','replies','accounts_engaged'
    ];
  
    const igId = igProfile.ig_id || igProfile.id;
    const days = 30;
    const today = new Date();
    const daysArray = Array.from({length: days}, (_, idx) => {
      const since = new Date(today);
      since.setDate(today.getDate() - (days - idx));
      const until = new Date(since);
      until.setDate(since.getDate() + 1);
      const pad = n => n.toString().padStart(2, '0');
      const fmt = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      return {
        sinceUnix: Math.floor(since.getTime() / 1000),
        untilUnix: Math.floor(until.getTime() / 1000),
        date: fmt(until)
      };
    });

  
    const fetchDay = async ({sinceUnix, untilUnix, date}) => {
      const endpoint = `https://graph.facebook.com/v20.0/${igId}/insights?metric=${metrics.join(',')}&period=day&since=${sinceUnix}&until=${untilUnix}&metric_type=total_value&access_token=${userToken}`;
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const obj = { date };
        if (Array.isArray(data.data)) {
          metrics.forEach(metricName => {
            const metricData = data.data.find(x => x.name === metricName);
            if (metricData?.total_value?.value !== undefined && metricData?.total_value?.value !== null) {
              obj[metricName] = metricData.total_value.value;
            } else {
              obj[metricName] = null;
            }
          });
        }
        return obj;
      } catch (err) {
        return { date };
      }
    };
  
    const results = await Promise.all(daysArray.map(fetchDay));
  
    const filtered = results.filter(row =>
      metrics.some(m => row[m] !== null && row[m] !== undefined)
    );
  
    console.log('Filtered results:', filtered);  
    return filtered;
  }
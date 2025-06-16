export default async function getPostMetricas() {
    // 1. Leer credenciales de localStorage
    const userToken = localStorage.getItem('epm_access_token');
    const igProfileRaw = localStorage.getItem('epm_instagram_profile');
    let igProfile;
    try {
      igProfile = JSON.parse(igProfileRaw);
    } catch (e) {
      throw new Error('Perfil de Instagram no válido');
    }
    if (!userToken || !igProfile) throw new Error('Tokens no disponibles');
  
    const igId = igProfile.ig_id || igProfile.id;
  
    // 2. Definir campos y métricas
    const fields = ['id', 'thumbnail_url', 'permalink', 'timestamp', 'media_type', 'media_product_type', 'is_shared_to_feed'];
    const metrics = ['views', 'reach', 'comments', 'likes', 'shares', 'ig_reels_avg_watch_time', 'saved'];
  
    // 3. Obtener los últimos 200 posteos
    const url_media = `https://graph.facebook.com/v18.0/${igId}/media?fields=${fields.join(',')}&limit=200&access_token=${userToken}`;
    const res_media = await fetch(url_media);
    const json_media = await res_media.json();
    const data_media = json_media.data || [];
  
    const rows = [];
  
    // 4. Para cada post compartido en el feed, obtener métricas
    for (const item of data_media) {
      if (!item.is_shared_to_feed) continue;
  
      // Copiar campos base
      const media_data = {};
      fields.forEach(f => {
        media_data[f] = item[f] ?? '';
      });
      const media_id = item.id;
  
      // 5. Obtener métricas
      const url_insights = `https://graph.facebook.com/v18.0/${media_id}/insights?metric=${metrics.join(',')}&period=day&metric_type=total_value&access_token=${userToken}`;
      let insights_data = [];
      try {
        const res_insights = await fetch(url_insights);
        const json_insights = await res_insights.json();
        insights_data = json_insights.data || [];
      } catch (e) {
        // Si falla el fetch de métricas, seguir sin ellas
        insights_data = [];
      }
  
      for (const metric of insights_data) {
        const metric_name = metric.name;
        let metric_value = metric.values && metric.values[0] ? metric.values[0].value : 0;
  
        // Convertir milisegundos a segundos si es ig_reels_avg_watch_time
        if (metric_name === 'ig_reels_avg_watch_time') {
          try {
            metric_value = Math.round((parseFloat(metric_value) / 1000) * 100) / 100;
          } catch {
            metric_value = 0;
          }
        }
  
        media_data[metric_name] = metric_value;
      }
  
      // 6. Fecha de consulta
      media_data['fecha_consulta'] = new Date().toISOString().replace('T', ' ').substring(0, 19);
  
      // 7. Timestamp solo fecha (YYYY-MM-DD)
      if (media_data['timestamp']) {
        try {
          media_data['timestamp'] = media_data['timestamp'].substring(0, 10);
        } catch (e) {
          // dejar como está
        }
      }
  
      rows.push(media_data);
    }
  
    return rows; // Array de objetos listo para tabla
  }
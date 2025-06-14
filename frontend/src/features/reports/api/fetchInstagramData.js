export default async function fetchInstagramData(endpoint) {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Error al consultar la API de Instagram');
    const data = await response.json();
    return data;
  }
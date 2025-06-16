import React, { useEffect, useState } from 'react';
import getPostMetricas from '../api/getPostMetricas';
import { CircularProgress, Alert, Box, Typography } from '@mui/material';

export default function PostMetricas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPostMetricas().then(setData).catch(setError).finally(() => setLoading(false));
  }, []);

  if (loading) return <Box textAlign="center" py={6}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!Array.isArray(data) || data.length === 0) return <Alert severity="info">No hay datos de posteos recientes.</Alert>;

  // Obtener todas las columnas únicas de data
  const allKeys = Array.from(
    data.reduce((acc, row) => {
      Object.keys(row).forEach(k => acc.add(k));
      return acc;
    }, new Set())
  );

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h5" mb={2}>Tabla de métricas de posteos</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              {allKeys.map(key => (
                <th key={key} style={{ padding: 8, textAlign: 'left', background: '#f6f6f6', borderBottom: '1px solid #eee' }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id || i} style={{ borderBottom: '1px solid #eee' }}>
                {allKeys.map(key => (
                  <td key={key} style={{ padding: 8 }}>
                    {typeof row[key] === 'number'
                      ? row[key].toLocaleString()
                      : (row[key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
import React, { useEffect, useState } from 'react';
import getLast30DaysReport from '../api/getLast30DaysReport';
import { CircularProgress, Alert, Box, Typography } from '@mui/material';

export default function Last30DaysReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLast30DaysReport()
      .then(d => setData(Array.isArray(d) ? d : []))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box textAlign="center" py={6}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!Array.isArray(data) || !data.length) return <Alert severity="info">No hay datos disponibles para los últimos 30 días.</Alert>;

  // Obtener todas las keys presentes en los objetos para mostrar todas las columnas posibles
  const allKeys = Array.from(
    data.reduce((acc, row) => {
      Object.keys(row).forEach(k => acc.add(k));
      return acc;
    }, new Set())
  );

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h5" mb={2}>Tabla cruda de datos últimos 30 días</Typography>
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
              <tr key={row.date || i} style={{ borderBottom: '1px solid #eee' }}>
                {allKeys.map(key => (
                  <td key={key} style={{ padding: 8 }}>
                    {typeof row[key] === 'number' ? row[key].toLocaleString() : (row[key] ?? '')}
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
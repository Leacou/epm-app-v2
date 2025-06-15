import React, { useEffect, useState } from 'react';
import getLast30DaysReport from '../api/getLast30DaysReport';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { CircularProgress, Alert, Box, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// Colores de marca
const METRIC_COLORS = {
  views: "#083963",           // Azul
  reach: "#5DA9DD",           // Celeste
  profile_views: "#EB8957",   // Naranja
  website_clicks: "#EBE4DD",  // Crema
  likes: "#EB8957",           // Naranja
  comments: "#083963",        // Azul
  shares: "#5DA9DD",          // Celeste
  replies: "#EBE4DD",         // Crema
  accounts_engaged: "#EB8957" // Naranja
};

const METRIC_LABELS = {
  views: "Vistas",
  reach: "Alcance",
  profile_views: "Vistas Perfil",
  website_clicks: "Clicks Web",
  likes: "Likes",
  comments: "Comentarios",
  shares: "Compartidos",
  replies: "Respuestas",
  accounts_engaged: "Cuentas Eng."
};

export default function Last30DaysReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Todas las métricas posibles (ordenadas como tabla)
  const allMetrics = [
    "views", "reach", "profile_views", "website_clicks", "likes", "comments", "shares", "replies", "accounts_engaged"
  ];

  // Por defecto, todas activas
  const [activeMetrics, setActiveMetrics] = useState(allMetrics);

  useEffect(() => {
    getLast30DaysReport()
      .then(d => setData(Array.isArray(d) ? d : []))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box textAlign="center" py={6}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!Array.isArray(data) || !data.length) return <Alert severity="info">No hay datos disponibles para los últimos 30 días.</Alert>;

  // Manejo de clicks en leyenda/checkbox
  const handleMetricToggle = metric => {
    setActiveMetrics(active =>
      active.includes(metric)
        ? active.filter(m => m !== metric)
        : [...active, metric]
    );
  };

  // Fechas con formato bonito
  const chartData = data.map(row => ({
    ...row,
    date: row.date ? new Date(row.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : ''
  }));

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h5" mb={3}>Métricas por día - Gráfico Interactivo</Typography>
      <Box mb={2}>
        <FormGroup row>
          {allMetrics.map(metric => (
            <FormControlLabel
              key={metric}
              control={
                <Checkbox
                  checked={activeMetrics.includes(metric)}
                  onChange={() => handleMetricToggle(metric)}
                  sx={{
                    color: METRIC_COLORS[metric],
                    '&.Mui-checked': { color: METRIC_COLORS[metric] }
                  }}
                />
              }
              label={METRIC_LABELS[metric] || metric}
              sx={{ mr: 2, mb: 1 }}
            />
          ))}
        </FormGroup>
      </Box>
      <Box sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 1, p: 2 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#EBE4DD" />
            <XAxis dataKey="date" tick={{ fill: "#083963", fontWeight: 500 }} />
            <YAxis tick={{ fill: "#083963" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: '1px solid #EBE4DD', color: "#083963" }}
              labelStyle={{ color: "#083963", fontWeight: 700 }}
              formatter={(value, name) =>
                [`${value}`, METRIC_LABELS[name] || name]
              }
            />
            {allMetrics.map(metric =>
              activeMetrics.includes(metric) && (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={METRIC_COLORS[metric]}
                  strokeWidth={2.5}
                  dot={{ r: 2.8 }}
                  activeDot={{ r: 5 }}
                  name={METRIC_LABELS[metric] || metric}
                  connectNulls
                />
              )
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
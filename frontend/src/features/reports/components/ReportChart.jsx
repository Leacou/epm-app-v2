import React from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Lista de métricas a mostrar con colores
const metrics = [
  { key: 'impressions', label: 'Impresiones', color: '#8884d8' },
  { key: 'reach', label: 'Alcance', color: '#82ca9d' },
  { key: 'profile_views', label: 'Vistas Perfil', color: '#ffc658' },
  { key: 'website_clicks', label: 'Clics Sitio Web', color: '#e57373' },
  { key: 'likes', label: 'Likes', color: '#6f42c1' },
  { key: 'comments', label: 'Comentarios', color: '#1976d2' },
  { key: 'shares', label: 'Compartidos', color: '#ffb300' },
  { key: 'replies', label: 'Respuestas', color: '#2e7d32' },
  { key: 'accounts_engaged', label: 'Cuentas Interactuadas', color: '#f50057' },
];

export default function ReportChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {metrics.map(
          ({ key, label, color }) =>
            data.some(d => d[key] !== undefined) && (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={label}
                stroke={color}
                dot={false}
                strokeWidth={2}
              />
            )
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
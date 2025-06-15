import React, { useEffect, useState, useMemo } from 'react';
import getLast30DaysReport from '../api/getLast30DaysReport';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  TrendingUp, Eye, Heart, MessageCircle, Share, Bookmark, Filter, Download, Play
} from 'lucide-react';
import { CircularProgress, Alert, Box, Typography, Button, Select, MenuItem } from '@mui/material';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

function calculateEngagement(row) {
  // engagement = (likes + comments + shares + saves) / reach * 100
  // "saves" no está en los datos diarios estándar, así que lo ponemos en 0
  const likes = row.likes ?? 0;
  const comments = row.comments ?? 0;
  const shares = row.shares ?? 0;
  const saves = row.saves ?? 0; // Si tu API lo trae, si no, ignóralo
  const reach = row.reach ?? 0;
  if (!reach) return 0;
  return Number(((likes + comments + shares + saves) / reach * 100).toFixed(2));
}

export default function Last30DaysReport() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    getLast30DaysReport()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box textAlign="center" py={6}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!data?.length) return <Alert severity="info">No hay datos disponibles para los últimos 30 días.</Alert>;

  // Prepara los datos
  const processedData = useMemo(() => data.map(row => ({
    ...row,
    engagementRate: calculateEngagement(row)
  })), [data]);

  // KPIs
  const totalReach = processedData.reduce((sum, d) => sum + (d.reach || 0), 0);
  const totalLikes = processedData.reduce((sum, d) => sum + (d.likes || 0), 0);
  const avgEngagement = processedData.length
    ? (processedData.reduce((sum, d) => sum + d.engagementRate, 0) / processedData.length).toFixed(2)
    : 0;
  const bestPerformer = processedData.reduce((best, d) =>
    d.engagementRate > (best.engagementRate || 0) ? d : best, {});

  // Para gráficos
  const chartData = processedData.map(d => ({
    date: new Date(d.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
    engagement: d.engagementRate,
    reach: d.reach,
    likes: d.likes,
    interactions: (d.likes || 0) + (d.comments || 0) + (d.shares || 0) + (d.saves || 0)
  }));

  // Pie engagement distribution
  const engagementDistribution = [
    { name: 'Alto (>7%)', value: processedData.filter(d => d.engagementRate > 7).length, color: COLORS[0] },
    { name: 'Medio (4-7%)', value: processedData.filter(d => d.engagementRate >= 4 && d.engagementRate <= 7).length, color: COLORS[1] },
    { name: 'Bajo (<4%)', value: processedData.filter(d => d.engagementRate < 4).length, color: COLORS[2] }
  ];

  // Sorting para tabla y tarjetas
  const sortedData = useMemo(() => {
    let arr = [...processedData];
    switch (sortBy) {
      case 'engagement':
        arr.sort((a, b) => b.engagementRate - a.engagementRate);
        break;
      case 'reach':
        arr.sort((a, b) => (b.reach || 0) - (a.reach || 0));
        break;
      case 'likes':
        arr.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default:
        arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return arr;
  }, [processedData, sortBy]);

  // Utilidad para thumbnails: si tenés, poné la url real, si no, usa placeholder (o quitá columna)
  const getThumbnail = (row) =>
    row.thumbnail ||
    `https://via.placeholder.com/120x120/eee/888?text=${row.date.replace(/-/g, '/')}`;

  // KPI Card
  const KPICard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Box
      sx={{
        bgcolor: 'white', borderRadius: 2, p: 3, boxShadow: 3, display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', minHeight: 90
      }}
    >
      <div>
        <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
        <Typography variant="h5" fontWeight={700}>{value}</Typography>
        {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
      </div>
      <Box sx={{ bgcolor: color, color: '#fff', borderRadius: '50%', p: 1.5 }}>
        <Icon size={28} />
      </Box>
    </Box>
  );

  // Tarjeta de día
  const DayCard = ({ row }) => (
    <Box
      sx={{
        bgcolor: 'white', borderRadius: 2, boxShadow: 2, overflow: 'hidden',
        transition: 'box-shadow .2s', '&:hover': { boxShadow: 6 }
      }}
    >
      <Box sx={{ position: 'relative', height: 120, bgcolor: '#f5f5f5' }}>
        <img src={getThumbnail(row)} alt={row.date} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box position="absolute" top={8} right={8} bgcolor="#0008" color="#fff" px={1} py={0.5} borderRadius={2} fontSize={12}>
          {row.engagementRate}%
        </Box>
      </Box>
      <Box p={2}>
        <Typography variant="body2" color="text.secondary">{new Date(row.date).toLocaleDateString('es-ES')}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
          <Typography variant="caption" sx={{
            bgcolor: row.engagementRate > 7 ? '#d1fae5' : row.engagementRate > 4 ? '#fef9c3' : '#fee2e2',
            color: row.engagementRate > 7 ? '#065f46' : row.engagementRate > 4 ? '#92400e' : '#991b1b',
            px: 1.5, py: 0.5, borderRadius: 2
          }}>
            {row.engagementRate > 7 ? 'Alto' : row.engagementRate > 4 ? 'Medio' : 'Bajo'}
          </Typography>
          <Play size={18} color="#888" />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, fontSize: 14 }}>
          <Box display="flex" alignItems="center" gap={1}><Eye size={16} /> {row.reach || 0}</Box>
          <Box display="flex" alignItems="center" gap={1}><Heart size={16} /> {row.likes || 0}</Box>
          <Box display="flex" alignItems="center" gap={1}><MessageCircle size={16} /> {row.comments || 0}</Box>
          <Box display="flex" alignItems="center" gap={1}><Share size={16} /> {row.shares || 0}</Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>Dashboard de Métricas Instagram</Typography>
        <Typography color="text.secondary">Análisis completo de los últimos 30 días</Typography>
      </Box>

      {/* Navegación */}
      <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 2, mb: 4, boxShadow: 2, display: 'flex', gap: 2 }}>
        {[
          { id: 'dashboard', label: 'Dashboard KPIs', icon: TrendingUp },
          { id: 'cards', label: 'Vista Tarjetas', icon: Eye },
          { id: 'charts', label: 'Gráficos', icon: BarChart },
          { id: 'table', label: 'Tabla Detallada', icon: Filter }
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeView === id ? 'contained' : 'outlined'}
            color={activeView === id ? 'secondary' : 'inherit'}
            startIcon={<Icon size={18} />}
            onClick={() => setActiveView(id)}
            sx={{ textTransform: 'none' }}
          >
            {label}
          </Button>
        ))}
      </Box>

      {/* Vista: Dashboard KPIs */}
      {activeView === 'dashboard' && (
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
            <KPICard title="Alcance Total" value={totalReach.toLocaleString()} icon={Eye} color="#3b82f6" subtitle="Últimos 30 días" />
            <KPICard title="Likes Totales" value={totalLikes.toLocaleString()} icon={Heart} color="#ef4444" subtitle="Últimos 30 días" />
            <KPICard title="Engagement Promedio" value={`${avgEngagement}%`} icon={TrendingUp} color="#10b981" subtitle="General" />
            <KPICard title="Mejor Día" value={`${bestPerformer.engagementRate || 0}%`} icon={Bookmark} color="#a78bfa"
              subtitle={bestPerformer?.date ? new Date(bestPerformer.date).toLocaleDateString('es-ES') : '-'} />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 3, boxShadow: 2, flex: 1, minWidth: 300 }}>
              <Typography fontWeight={600} mb={1}>Distribución de Engagement</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={engagementDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%" cy="50%" outerRadius={70}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {engagementDistribution.map((entry, idx) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      )}

      {/* Vista Tarjetas */}
      {activeView === 'cards' && (
        <Box>
          <Box display="flex" gap={2} mb={2}>
            <Select value={sortBy} onChange={e => setSortBy(e.target.value)} size="small">
              <MenuItem value="date">Ordenar por fecha</MenuItem>
              <MenuItem value="engagement">Ordenar por engagement</MenuItem>
              <MenuItem value="reach">Ordenar por alcance</MenuItem>
              <MenuItem value="likes">Ordenar por likes</MenuItem>
            </Select>
            <Button variant="outlined" startIcon={<Download size={18} />}>Exportar</Button>
          </Box>
          <Box sx={{
            display: 'grid', gap: 3,
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' }
          }}>
            {sortedData.map(row => <DayCard key={row.date} row={row} />)}
          </Box>
        </Box>
      )}

      {/* Vista Gráficos */}
      {activeView === 'charts' && (
        <Box className="space-y-8">
          <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 3, boxShadow: 2, mb: 4 }}>
            <Typography fontWeight={600} mb={2}>Evolución del Engagement Rate</Typography>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={v => [`${v}%`, 'Engagement Rate']} />
                <Legend />
                <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 3, boxShadow: 2 }}>
              <Typography fontWeight={600} mb={2}>Alcance por Día</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="reach" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 3, boxShadow: 2 }}>
              <Typography fontWeight={600} mb={2}>Likes vs Interacciones Totales</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="likes" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interactions" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      )}

      {/* Tabla Detallada */}
      {activeView === 'table' && (
        <Box sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 2, overflow: 'auto' }}>
          <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography fontWeight={600}>Análisis Detallado</Typography>
            <Button variant="outlined" startIcon={<Download size={18} />}>Exportar Excel</Button>
          </Box>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#fafafa' }}>
                  <th style={{ padding: 8, textAlign: 'left' }}>Fecha</th>
                  <th style={{ padding: 8, textAlign: 'right' }}>Alcance</th>
                  <th style={{ padding: 8, textAlign: 'right' }}>Impresiones</th>
                  <th style={{ padding: 8, textAlign: 'right' }}>Likes</th>
                  <th style={{ padding: 8, textAlign: 'right' }}>Comentarios</th>
                  <th style={{ padding: 8, textAlign: 'right' }}>Compartidos</th>
                  <th style={{ padding: 8, textAlign: 'right' }}>Engagement %</th>
                  <th style={{ padding: 8, textAlign: 'right' }}>Performance</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map(row => (
                  <tr key={row.date} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>{new Date(row.date).toLocaleDateString('es-ES')}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.reach?.toLocaleString() || 0}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.views?.toLocaleString() || 0}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.likes || 0}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.comments || 0}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.shares || 0}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.engagementRate}%</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-block', borderRadius: 12, padding: '2px 10px',
                        background: row.engagementRate > 7 ? '#d1fae5' : row.engagementRate > 4 ? '#fef9c3' : '#fee2e2',
                        color: row.engagementRate > 7 ? '#065f46' : row.engagementRate > 4 ? '#92400e' : '#991b1b'
                      }}>
                        {row.engagementRate > 7 ? 'Alto' : row.engagementRate > 4 ? 'Medio' : 'Bajo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
    </Box>
  );
}
import React, { useEffect, useState, useMemo } from 'react';
import getPostMetricas from '../api/getPostMetricas';
import {
  Box, Typography, Alert, Card, CardMedia, CardContent, CardActions,
  Button, Grid, Select, MenuItem, FormControl, InputLabel, Skeleton, Tooltip
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Colores de tu marca
const COLORS = {
  azul: "#083963",
  celeste: "#5DA9DD",
  naranja: "#EB8957",
  crema: "#EBE4DD",
  blanco: "#fff"
};

const METRIC_LABELS = {
  views: "Vistas",
  reach: "Alcance",
  comments: "Comentarios",
  likes: "Likes",
  shares: "Compartidos",
  ig_reels_avg_watch_time: "Ver promedio (s)",
  saved: "Guardados"
};

const ORDER_OPTIONS = [
  { value: "views", label: "Vistas" },
  { value: "reach", label: "Alcance" },
  { value: "likes", label: "Likes" },
  { value: "comments", label: "Comentarios" },
  { value: "shares", label: "Compartidos" },
  { value: "ig_reels_avg_watch_time", label: "Ver prom. (s)" },
  { value: "saved", label: "Guardados" },
  { value: "timestamp", label: "Fecha" }
];

function formatDate(dateStr) {
  // dateStr: "2025-06-11"
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("es-AR", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function LastPostMetricas() {
  const [data, setData] = useState([]);
  const [orderBy, setOrderBy] = useState('views');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animación de loading: 8 tarjetas Skeleton
  const loadingSkeletons = Array(8).fill(0);

  useEffect(() => {
    setLoading(true);
    getPostMetricas()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // Ordena los datos según la métrica seleccionada
  const orderedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const arr = [...data];
    if (orderBy === "timestamp") {
      arr.sort((a, b) => (b.timestamp || "").localeCompare(a.timestamp || ""));
    } else {
      arr.sort((a, b) => (Number(b[orderBy] || 0) - Number(a[orderBy] || 0)));
    }
    return arr;
  }, [data, orderBy]);

  if (loading) {
    return (
      <Box sx={{ py: 3 }}>
        <Typography variant="h5" mb={2}>Cargando publicaciones...</Typography>
        <Grid container spacing={2}>
          {loadingSkeletons.map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                <Skeleton variant="rectangular" height={180} animation="wave" />
                <Box sx={{ p: 2 }}>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                  <Skeleton width="80%" />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!Array.isArray(data) || data.length === 0) return <Alert severity="info">No hay datos de posteos recientes.</Alert>;

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        mb: 2
      }}>
        <Typography variant="h5" mb={{ xs: 1, sm: 0 }}>Tus últimos Reels</Typography>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="order-label">Ordenar por</InputLabel>
          <Select
            labelId="order-label"
            value={orderBy}
            label="Ordenar por"
            onChange={e => setOrderBy(e.target.value)}
          >
            {ORDER_OPTIONS.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {orderedData.map(post => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: "0 4px 16px 0 #08396318",
              display: "flex",
              flexDirection: "column",
              bgcolor: COLORS.blanco,
              minHeight: 360,
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-6px) scale(1.03)", boxShadow: "0 6px 20px 0 #08396322" }
            }}>
              <CardMedia
                component="img"
                height="180"
                image={post.thumbnail_url}
                alt="Preview"
                sx={{ objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />
              <CardContent sx={{ flex: 1, pb: 0 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography variant="subtitle2" fontWeight={600} color={COLORS.azul}>
                    {formatDate(post.timestamp)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 0.5, mb: 1 }}>
                    <Tooltip title="Ver en Instagram" arrow>
                      <Button
                        href={post.permalink}
                        target="_blank"
                        size="small"
                        sx={{
                          bgcolor: COLORS.celeste,
                          color: "#fff",
                          borderRadius: 2,
                          px: 1.5,
                          py: 0.25,
                          textTransform: "none",
                          fontWeight: 500,
                          fontSize: 13,
                          minWidth: 0,
                          mr: 1
                        }}
                        startIcon={<OpenInNewIcon fontSize="small" />}
                      >
                        Reel
                      </Button>
                    </Tooltip>
                    <Typography variant="body2" color={COLORS.naranja} fontWeight={500}>
                      {post.media_type === "REEL" ? "Reel" : post.media_type}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.1 }}>
                    {Object.keys(METRIC_LABELS).map(metric =>
                      (post[metric] !== undefined) && (
                        <Box
                          key={metric}
                          sx={{
                            bgcolor: COLORS.crema,
                            color: COLORS.azul,
                            borderRadius: 2,
                            px: 1,
                            py: 0.5,
                            fontSize: 14,
                            display: "flex",
                            alignItems: "center",
                            minWidth: 75,
                            fontWeight: 500
                          }}
                        >
                          <span style={{ marginRight: 4 }}>{METRIC_LABELS[metric]}:</span>
                          <span style={{ color: COLORS.naranja, fontWeight: 700 }}>
                            {typeof post[metric] === 'number' ? post[metric].toLocaleString() : post[metric]}
                          </span>
                        </Box>
                      )
                    )}
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ pt: 0.5, pb: 1, justifyContent: "flex-end" }}>
                <Typography variant="caption" color="#888" ml="auto">
                  Consultado: {post.fecha_consulta ? post.fecha_consulta.slice(0, 16) : ""}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
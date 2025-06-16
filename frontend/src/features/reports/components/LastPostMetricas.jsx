import React, { useEffect, useState, useMemo } from 'react';
import getPostMetricas from '../api/getPostMetricas';
import {
  Box, Typography, Alert, Card, CardMedia, CardContent, CardActions,
  Button, Grid, Select, MenuItem, FormControl, InputLabel, Skeleton, Tooltip, Chip
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupsIcon from '@mui/icons-material/Groups';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const COLORS = {
  azul: "#083963",
  celeste: "#5DA9DD",
  naranja: "#EB8957",
  crema: "#EBE4DD",
  blanco: "#fff"
};

const METRIC_LABELS = {
  views: { label: "Vistas", icon: <VisibilityIcon fontSize="small" sx={{ mr: 0.5 }}/> },
  reach: { label: "Alcance", icon: <GroupsIcon fontSize="small" sx={{ mr: 0.5 }}/> },
  comments: { label: "Comentarios", icon: <CommentIcon fontSize="small" sx={{ mr: 0.5 }}/> },
  likes: { label: "Likes", icon: <ThumbUpIcon fontSize="small" sx={{ mr: 0.5 }}/> },
  shares: { label: "Compartidos", icon: <ShareIcon fontSize="small" sx={{ mr: 0.5 }}/> },
  ig_reels_avg_watch_time: { label: "Ver prom. (s)", icon: <WatchLaterIcon fontSize="small" sx={{ mr: 0.5 }}/> },
  saved: { label: "Guardados", icon: <BookmarkIcon fontSize="small" sx={{ mr: 0.5 }}/> }
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

  const loadingSkeletons = Array(8).fill(0);

  useEffect(() => {
    setLoading(true);
    getPostMetricas()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

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
        <Grid container spacing={3}>
          {loadingSkeletons.map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Card sx={{ borderRadius: 4, boxShadow: 2, height: 430 }}>
                <Skeleton variant="rectangular" animation="wave" width="100%" height={320} sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
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
      <Grid container spacing={3}>
        {orderedData.map(post => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 4px 20px 0 #08396318",
                display: "flex",
                flexDirection: "column",
                bgcolor: COLORS.blanco,
                minHeight: 430,
                height: 430,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": { transform: "translateY(-8px) scale(1.04)", boxShadow: "0 8px 30px 0 #08396328" }
              }}
            >
              <CardMedia
                component="img"
                image={post.thumbnail_url}
                alt="Preview"
                sx={{
                  width: "100%",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  height: 320,
                  minHeight: 320
                }}
              />
              <CardContent sx={{ flex: 1, pb: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, gap: 1 }}>
                  <Tooltip title="Ver en Instagram" arrow>
                    <Button
                      href={post.permalink}
                      target="_blank"
                      size="small"
                      sx={{
                        bgcolor: COLORS.celeste,
                        color: "#fff",
                        borderRadius: 2,
                        px: 1.2,
                        py: 0.25,
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: 13,
                        minWidth: 0,
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#4a90c2" }
                      }}
                      startIcon={<OpenInNewIcon fontSize="small" />}
                    >
                      Reel
                    </Button>
                  </Tooltip>
                  <Typography variant="subtitle2" color={COLORS.naranja} sx={{ fontWeight: 700, ml: 1 }}>
                    {post.media_type === "REEL" ? "Reel" : post.media_type}
                  </Typography>
                  <Typography variant="body2" color={COLORS.azul} sx={{ fontWeight: 500, ml: "auto" }}>
                    {formatDate(post.timestamp)}
                  </Typography>
                </Box>
                <Box sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.2,
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}>
                  {Object.keys(METRIC_LABELS).map(metric =>
                    (post[metric] !== undefined) && (
                      <Chip
                        key={metric}
                        icon={METRIC_LABELS[metric].icon}
                        label={
                          <span>
                            <b style={{ color: COLORS.naranja }}>{typeof post[metric] === 'number' ? post[metric].toLocaleString() : post[metric]}</b>
                            <span style={{ marginLeft: 2 }}> {METRIC_LABELS[metric].label}</span>
                          </span>
                        }
                        sx={{
                          bgcolor: COLORS.crema,
                          color: COLORS.azul,
                          fontWeight: 500,
                          fontSize: 13,
                          px: 1,
                          borderRadius: 2,
                          '& .MuiChip-icon': { color: COLORS.celeste, ml: 0.2 }
                        }}
                        size="small"
                      />
                    )
                  )}
                </Box>
              </CardContent>
              <CardActions sx={{ pt: 0, pb: 1, justifyContent: "flex-end" }}>
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
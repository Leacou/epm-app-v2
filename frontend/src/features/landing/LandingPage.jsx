import React from "react";
import AppLayout from "../../components/AppLayout";
import { Box, Typography, Button, Grid, Card, CardContent, Link as MuiLink, Divider } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getFacebookLoginUrl } from "../../api/facebook";

export default function LandingPage() {
  const handleLogin = () => {
    window.location.href = getFacebookLoginUrl();
  };

  return (
    <AppLayout>
      {/* HERO */}
      <Box
        sx={{
          minHeight: { xs: "65vh", md: "70vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          py: { xs: 6, md: 10 },
          gap: 3
        }}
      >
        <img src="/img/epm.jpg" alt="Logo EPM" style={{ width: 86, marginBottom: 6, borderRadius: 16, boxShadow: "0 2px 16px rgba(8,57,99,0.10)" }} />
        <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: 30, md: 44 }, mb: 1 }}>
          Analiza tu Instagram <br /> como un  profesional
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", maxWidth: 480, mx: "auto", mb: 2, fontSize: { xs: 16, md: 20 } }}>
          Descubre el crecimiento de tus cuentas, accede a reportes automáticos y mejora tu estrategia. <br />
          <b>¡Pruébalo gratis ahora!</b>
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleLogin}
          sx={{
            background: "#1877f3",
            color: "#fff",
            fontWeight: 700,
            py: 1.3,
            px: 4,
            fontSize: 18,
            borderRadius: 3,
            boxShadow: "0 4px 16px rgba(24,119,243,0.09)",
            mb: 1,
            mt: 2,
            "&:hover": { background: "#166fe0" }
          }}
          startIcon={
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <rect width="24" height="24" rx="4" fill="#1877f3"/>
              <path d="M17.525 14.09l.442-2.878h-2.75V9.152c0-.788.385-1.557 1.62-1.557h1.255V5.204s-1.14-.195-2.233-.195c-2.278 0-3.77 1.381-3.77 3.878v2.325H7.5v2.878h2.59V21h3.127v-6.91h2.308z" fill="white"/>
            </svg>
          }
        >
          Iniciar sesión con Facebook
        </Button>
        <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 1 }}>Sin tarjeta de crédito. Sin compromiso.</Typography>
      </Box>
      
      {/* BENEFICIOS */}
      <Box sx={{ maxWidth: 1100, mx: "auto", px: 2, py: { xs: 4, md: 6 } }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4 }}>
          ¿Por qué elegir EPM App?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2, minHeight: 180 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <InstagramIcon sx={{ fontSize: 40, color: "#E1306C", mb: 1 }} />
                <Typography variant="h6" gutterBottom>Conecta tus cuentas</Typography>
                <Typography variant="body2" color="text.secondary">
                  Vincula tus cuentas de Instagram y accede a sus métricas en pocos clics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2, minHeight: 180 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <BarChartIcon sx={{ fontSize: 40, color: "#3F51B5", mb: 1 }} />
                <Typography variant="h6" gutterBottom>Reportes automáticos</Typography>
                <Typography variant="body2" color="text.secondary">
                  Visualiza reportes y tendencias de tus cuentas en tiempo real.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2, minHeight: 180 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: "#43A047", mb: 1 }} />
                <Typography variant="h6" gutterBottom>Crece con datos</Typography>
                <Typography variant="body2" color="text.secondary">
                  Descubre qué funciona y mejora tu estrategia para aumentar tu audiencia.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2, minHeight: 180 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <SecurityIcon sx={{ fontSize: 40, color: "#1877f3", mb: 1 }} />
                <Typography variant="h6" gutterBottom>Privacidad garantizada</Typography>
                <Typography variant="body2" color="text.secondary">
                  Tus datos siempre protegidos. No publicamos ni compartimos nada sin tu permiso.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* PASOS */}
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2, py: { xs: 4, md: 6 }, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          ¿Cómo funciona?
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 3, borderRadius: 3, minHeight: 140, boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>1</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>Inicia sesión con Facebook</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={1} sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center" }}>
            <ArrowForwardIosIcon color="primary" sx={{ fontSize: 34 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 3, borderRadius: 3, minHeight: 140, boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>2</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>Conecta tus cuentas de Instagram</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={1} sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center" }}>
            <ArrowForwardIosIcon color="primary" sx={{ fontSize: 34 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 3, borderRadius: 3, minHeight: 140, boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>3</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>Visualiza tus analíticas</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4, fontWeight: 700, borderRadius: 3, px: 5 }}
          onClick={handleLogin}
        >
          ¡Quiero probar EPM App gratis!
        </Button>
      </Box>

      {/* FOOTER */}
      <Divider sx={{ my: 6, maxWidth: 400, mx: "auto" }} />
      <Box sx={{ mb: 2, textAlign: "center", color: "text.secondary", fontSize: 14 }}>
        <MuiLink href="/terminos" underline="hover" sx={{ mx: 2 }}>
          Términos y Condiciones
        </MuiLink>
        <MuiLink href="/privacidad" underline="hover" sx={{ mx: 2 }}>
          Política de Privacidad
        </MuiLink>
        <div style={{ marginTop: 6 }}>
          © {new Date().getFullYear()} EPM App — Hecho desde Argentina por Lea Couretot
        </div>
      </Box>
    </AppLayout>
  );
}
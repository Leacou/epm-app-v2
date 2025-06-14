import React, { useEffect } from "react";
import { useFacebookLogin } from "/EPM app v2/frontend/src/hooks/useFacebookLogin";
import AppLayout from "/EPM app v2/frontend/src/componentss/AppLayout";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Button,
  Grid,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Accounts() {
  const { loading, error, fbProfile, igProfile, login } = useFacebookLogin();

  useEffect(() => {
    login();
    window.history.replaceState(null, '', window.location.pathname);
    // eslint-disable-next-line
  }, []);

  // Si quieres soportar varias cuentas, ponlas en un array. Por ahora, igProfile puede ser solo una.
  const instagramAccounts = igProfile ? [igProfile] : [];

  return (
    <AppLayout>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ mt: 4 }}>
        {fbProfile && (
          <>
            <Avatar
              src={fbProfile.picture?.data?.url}
              sx={{
                width: 72,
                height: 72,
                bgcolor: "primary.main",
                mb: 1,
                boxShadow: 2,
              }}
              alt="Perfil Facebook"
            >
              <FacebookIcon />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              ¡Hola, {fbProfile.name}! Bienvenido a EPM App
            </Typography>
          </>
        )}

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Selecciona una de tus cuentas de Instagram
        </Typography>

        {loading && <CircularProgress color="primary" />}
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 600 }}>
          {instagramAccounts.length > 0 ? (
            instagramAccounts.map((ig, idx) => (
              <Grid item xs={12} sm={6} md={4} key={ig.id || idx}>
                <Card
                  sx={{
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.04)",
                      boxShadow: 6,
                      cursor: "pointer",
                    },
                    bgcolor: "background.paper",
                  }}
                  // onClick={() => { /* Aquí puedes manejar la selección y navegación */ }}
                >
                  <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={ig.profile_picture_url}
                      sx={{ width: 64, height: 64, bgcolor: "secondary.main" }}
                      alt={ig.username}
                    >
                      <InstagramIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: "secondary.main" }}>
                      @{ig.username}
                    </Typography>
                    <Typography variant="body2">{ig.name}</Typography>
                    <Chip
                      icon={<InstagramIcon style={{ color: "#EB8957" }} />}
                      label="Instagram"
                      sx={{ bgcolor: "#EBE4DD", color: "#EB8957", fontWeight: 500, mt: 1 }}
                      size="small"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            !loading && (
              <Typography variant="body2" color="text.secondary">
                No hay cuentas de Instagram asociadas a tu Facebook.
              </Typography>
            )
          )}
        </Grid>

        <Button
          variant="contained"
          color="info"
          sx={{ mt: 5, px: 4, fontWeight: 700, borderRadius: 20 }}
          onClick={login}
        >
          Volver a conectar cuentas
        </Button>
      </Box>
    </AppLayout>
  );
}
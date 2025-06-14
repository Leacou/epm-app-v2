import React, { useEffect } from "react";
import { useFacebookLogin } from "../hooks/useFacebookLogin";
import AppLayout from "../components/AppLayout";
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

  return (
    <AppLayout>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Typography variant="h4" gutterBottom>
          Mis Cuentas Asociadas
        </Typography>
        {loading && <CircularProgress color="primary" />}
        {error && <Alert severity="error">{error}</Alert>}

        {fbProfile && (
          <Card sx={{ minWidth: 340, bgcolor: "background.paper" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={fbProfile.picture?.data?.url}
                sx={{ width: 64, height: 64, bgcolor: "primary.main" }}
                alt="Perfil Facebook"
              >
                <FacebookIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">{fbProfile.name}</Typography>
                <Chip
                  icon={<FacebookIcon style={{ color: "#083963" }} />}
                  label="Facebook"
                  sx={{ bgcolor: "#EBE4DD", color: "#083963", fontWeight: 500, mt: 1 }}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        )}

        {igProfile && (
          <Card sx={{ minWidth: 340, bgcolor: "background.paper" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={igProfile.profile_picture_url}
                sx={{ width: 64, height: 64, bgcolor: "secondary.main" }}
                alt="Instagram Profile"
              >
                <InstagramIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: "secondary.main" }}>
                  @{igProfile.username}
                </Typography>
                <Chip
                  icon={<InstagramIcon style={{ color: "#EB8957" }} />}
                  label="Instagram"
                  sx={{ bgcolor: "#EBE4DD", color: "#EB8957", fontWeight: 500, mt: 1 }}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        )}

        <Button
          variant="contained"
          color="info"
          sx={{ mt: 4, px: 4, fontWeight: 700, borderRadius: 20 }}
          onClick={login}
        >
          Volver a conectar cuentas
        </Button>
      </Box>
    </AppLayout>
  );
}
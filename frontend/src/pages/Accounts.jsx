import React, { useEffect } from "react";
import { useFacebookLogin } from "../hooks/useFacebookLogin";
import AppLayout from "../components/AppLayout";
import { Box, Card, CardContent, Avatar, Typography, CircularProgress, Alert } from "@mui/material";

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
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {fbProfile && (
          <Card sx={{ minWidth: 320 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={fbProfile.picture?.data?.url}
                sx={{ width: 64, height: 64 }}
                alt="Perfil Facebook"
              />
              <Box>
                <Typography variant="h6">{fbProfile.name}</Typography>
                <Typography color="text.secondary">Facebook</Typography>
              </Box>
            </CardContent>
          </Card>
        )}
        {igProfile && (
          <Card sx={{ minWidth: 320 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={igProfile.profile_picture_url}
                sx={{ width: 64, height: 64 }}
                alt="Instagram Profile"
              />
              <Box>
                <Typography variant="h6">@{igProfile.username}</Typography>
                <Typography color="text.secondary">Instagram</Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </AppLayout>
  );
}
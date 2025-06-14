import React from "react";
import AppLayout from "../../components/AppLayout";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/QueryStats";
import SchoolIcon from "@mui/icons-material/School";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

// Configuración de los productos disponibles
const products = [
  {
    name: "Reportes",
    description: "Visualiza estadísticas y métricas de tu cuenta.",
    icon: <DashboardIcon fontSize="large" sx={{ color: "#4B7BE5" }} />,
    redirect: "/dashboard", // ¡Esto lo puedes crear después!
  },
  {
    name: "Mentoría",
    description: "Agenda sesiones y recibe asesoramiento personalizado.",
    icon: <SchoolIcon fontSize="large" sx={{ color: "#43B97F" }} />,
    redirect: "/mentoria",
  },
  {
    name: "Estrategia de contenido",
    description: "Obtén ideas y planificación de publicaciones.",
    icon: <LightbulbIcon fontSize="large" sx={{ color: "#F9C846" }} />,
    redirect: "/estrategia",
  },
  {
    name: "Configuración",
    description: "Gestiona la configuración de tu cuenta y productos.",
    icon: <SettingsIcon fontSize="large" sx={{ color: "#888" }} />,
    redirect: "/configuracion",
  },
];

export default function UserHome() {
  const navigate = useNavigate();
  // Podés traer datos de la cuenta IG seleccionada si querés personalizar

  return (
    <AppLayout>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 5, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          ¿Qué te gustaría hacer hoy?
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4, color: "text.secondary" }}>
          Elige un producto para comenzar
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 900 }}>
          {products.map((prod) => (
            <Grid item xs={12} sm={6} md={3} key={prod.name}>
              <Card
                sx={{
                  transition: "transform 0.15s, box-shadow 0.15s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 8,
                    cursor: "pointer",
                  },
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "background.paper",
                }}
                onClick={() => navigate(prod.redirect)}
              >
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ width: 56, height: 56, bgcolor: "#F5F6FA", mb: 1 }}>
                    {prod.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {prod.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
                    {prod.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AppLayout>
  );
}
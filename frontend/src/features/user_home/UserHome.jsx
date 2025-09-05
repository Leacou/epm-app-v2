import React from "react";
import AppLayout from "../../components/AppLayout";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/QueryStats";
import SchoolIcon from "@mui/icons-material/School";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

// Helper function to get query parameters from localStorage
const getMentoriaRedirectUrl = () => {
  // Retrieve the object from localStorage
  const instagramProfile = JSON.parse(localStorage.getItem("epm_instagram_profile"));
  // Si no existe info, retorna null
  if (!instagramProfile) return null;

  // Access specific properties
  const ig_id = instagramProfile.id;
  const ig_name = encodeURIComponent(instagramProfile.name); // Encode special characters
  const ig_picture = encodeURIComponent(instagramProfile.profile_picture_url); // Encode special characters
  const long_lived_token = localStorage.getItem("epm_access_token");

  return `https://epm-mentoria.onrender.com/?ig_id=${ig_id}&ig_name=${ig_name}&ig_picture=${ig_picture}&long_lived_token=${long_lived_token}`;
};

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
    // redirect: getMentoriaRedirectUrl(), // <-- NO LLAMES AQUÍ LA FUNCIÓN
    redirect: "mentoria_func", // Usamos un placeholder para identificar el producto
  },
  {
    name: "Estrategia de contenido",
    description: "Obtén ideas y planificación de publicaciones.",
    icon: <LightbulbIcon fontSize="large" sx={{ color: "#F9C846" }} />,
    redirect: "/estrategia",
  },
  {
    name: "Configuración",
    description: "Administra tu cuenta y preferencias.",
    icon: <SettingsIcon fontSize="large" sx={{ color: "#FF6B6B" }} />,
    redirect: "/configuracion",
  },
];

export default function UserHome() {
  const navigate = useNavigate();

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
                onClick={() => {
                  if (prod.name === "Mentoría") {
                    // Solo redirige si la info está en localStorage
                    const mentoriaUrl = getMentoriaRedirectUrl();
                    if (mentoriaUrl) {
                      window.location.href = mentoriaUrl;
                    } else {
                      // Muestra un mensaje, o redirige al login
                      alert("Por favor, inicia sesión con Instagram antes de acceder a Mentoría.");
                      navigate("/login"); // O la ruta que corresponda
                    }
                  } else {
                    navigate(prod.redirect);
                  }
                }}
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
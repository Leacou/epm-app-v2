import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Container, CssBaseline, Avatar,
  IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";

// Lista de ítems del menú principal, cada uno con texto, icono y ruta de navegación
const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, link: '/' },
  { text: 'Cuentas', icon: <InstagramIcon />, link: '/accounts' },
  { text: 'Sobre la app', icon: <InfoIcon />, link: '/about' },
  // Puedes agregar más links aquí
];

export default function AppLayout({ children }) {
  // Estado para controlar si el Drawer (menú lateral mobile) está abierto/cerrado
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Hook de react-router para navegación programática
  const navigate = useNavigate();

  // Función para abrir/cerrar el Drawer
  const handleDrawer = (open) => () => setDrawerOpen(open);

  // Lógica de logout: limpia localStorage y redirige a inicio
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      {/* Normaliza estilos base de la app */}
      <CssBaseline />

      {/* Barra superior de navegación */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderBottom: '3px solid #EB8957',
        }}
      >
        <Toolbar>
          {/* Botón para abrir el menú lateral (solo visible en mobile) */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
            onClick={handleDrawer(true)}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          {/* Avatar/logo de la app */}
          <Avatar
            src="/img/epm.jpg" // URL de la imagen
            alt= "LC" // Texto alternativo
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              mr: 2,
              fontWeight: 700,
              fontSize: 24,
              width: 48,
              height: 48,
              boxShadow: '0 2px 8px rgba(8,57,99,0.10)'
            }}
          />

          {/* Nombre de la app */}
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            EPM App
          </Typography>

          {/* Menú principal (horizontal) solo visible en desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {
              // Renderiza cada ítem del menú con su icono y texto, usando Link de react-router-dom
              menuItems.map((item) => (
                <Box
                  key={item.text}
                  component={Link}
                  to={item.link}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: 'white',
                    textDecoration: "none",
                    cursor: 'pointer',
                    fontWeight: 500,
                    '&:hover': { color: 'secondary.main' },
                    transition: 'color 0.2s'
                  }}
                >
                  {item.icon}
                  <Typography variant="body1" sx={{ ml: 1 }}>{item.text}</Typography>
                </Box>
              ))
            }
            {/* Botón de logout, siempre visible en la barra */}
            <IconButton color="inherit" sx={{ ml: 2 }} onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (menú lateral para mobile) */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawer(false)}>
        <Box sx={{ width: 220 }} role="presentation" onClick={handleDrawer(false)}>
          <List>
            {
              // Renderiza los mismos ítems del menú, ahora en formato vertical para mobile
              menuItems.map((item) => (
                <ListItem button key={item.text} component={Link} to={item.link}>
                  <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))
            }
            <Divider />
            {/* Opción de logout en el drawer */}
            <ListItem button onClick={handleLogout}>
              <ListItemIcon sx={{ minWidth: 36 }}><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Contenedor principal del contenido de la app */}
      <Box
        sx={{
          bgcolor: '#EBE4DD',
          minHeight: '100vh',
          py: { xs: 2, md: 6 },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            boxShadow: { xs: 'none', md: '0 8px 32px rgba(8,57,99,0.08)' },
            borderRadius: 4,
            bgcolor: 'background.paper',
            minHeight: { xs: 'auto', md: 500 },
            px: { xs: 1, md: 4 },
            py: { xs: 2, md: 4 },
          }}
        >
          {/* Aquí se renderizan los hijos del layout, es decir, la página específica */}
          {children}
        </Container>
      </Box>
    </>
  );
}
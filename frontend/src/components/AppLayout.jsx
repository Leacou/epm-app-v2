import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Container, CssBaseline, Avatar,
  IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken, clearAccessToken } from '../utils/auth';

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, link: '/' },
  { text: 'Cuentas', icon: <InstagramIcon />, link: '/accounts' },
  { text: 'Productos', icon: <InfoIcon />, link: '/user-home' },
];

export default function AppLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!getAccessToken();

  const handleDrawer = (open) => () => setDrawerOpen(open);

  const handleLogout = () => {
    clearAccessToken();
    navigate('/');
  };

  return (
    <>
      <CssBaseline />
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
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
            onClick={handleDrawer(true)}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Avatar
            src="/img/epm.jpg"
            alt= "LC"
            sx={{
              color: 'white',
              mr: 2,
              fontWeight: 700,
              fontSize: 24,
              width: 48,
              height: 48,
              boxShadow: '0 2px 8px rgba(8,57,99,0.10)'
            }}
          />
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            EPM App
          </Typography>

          {isLoggedIn ? (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {menuItems.map((item) => (
                <Box
                  key={item.text}
                  component={Link}
                  to={item.link}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    textDecoration: "none",
                    cursor: 'pointer',
                    fontWeight: 500,
                    '&:hover': { color: 'secondary.main' },
                    transition: 'color 0.2s'
                  }}
                >
                  {item.icon}
                  <Typography variant="body1" sx={{ ml: 1, color: "#fff" }}>{item.text}</Typography>
                </Box>
              ))}
              <IconButton color="inherit" sx={{ ml: 2 }} onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
            // Opcional: Mostrar botón para volver a la landing si está en otra página
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              <Button
                component={Link}
                to="/"
                color="inherit"
                variant="outlined"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  fontWeight: 500,
                  '&:hover': { borderColor: 'secondary.main', color: 'secondary.main' }
                }}
              >
                Ir a inicio
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer para mobile SOLO si está logueado */}
      {isLoggedIn && (
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawer(false)}>
          <Box sx={{ width: 220 }} role="presentation" onClick={handleDrawer(false)}>
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.text} component={Link} to={item.link}>
                  <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
              <Divider />
              <ListItem button onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 36 }}><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}

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
          {children}
        </Container>
      </Box>
    </>
  );
}
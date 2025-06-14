import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, CssBaseline, Avatar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, link: '/' },
  { text: 'Cuentas', icon: <InstagramIcon />, link: '/accounts' },
  { text: 'Sobre la app', icon: <InfoIcon />, link: '/about' },
  // Puedes agregar más links aquí
];

export default function AppLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = (open) => () => setDrawerOpen(open);

  // Para navegación, puedes usar react-router-dom: useNavigate() o <Link> si lo necesitas

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
          {/* Botón menú solo visible en mobile */}
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
          >
            LC
          </Avatar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            EPM App
          </Typography>
          {/* Menú horizontal solo visible en desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {menuItems.map((item) => (
              <Typography
                key={item.text}
                variant="body1"
                sx={{
                  cursor: 'pointer',
                  fontWeight: 500,
                  '&:hover': { color: 'secondary.main' },
                  transition: 'color 0.2s'
                }}
                // onClick={...} // Aquí puedes usar navegación
              >
                {item.text}
              </Typography>
            ))}
            <IconButton color="inherit" sx={{ ml: 2 }}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Drawer lateral (mobile) */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawer(false)}>
        <Box sx={{ width: 220 }} role="presentation" onClick={handleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text}>
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <Divider />
            <ListItem button>
              <ListItemIcon sx={{ minWidth: 36 }}><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
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
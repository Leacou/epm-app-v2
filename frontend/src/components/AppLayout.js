import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, CssBaseline, Avatar } from '@mui/material';

export default function AppLayout({ children }) {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderBottom: '3px solid #EB8957', // orange
        }}
      >
        <Toolbar>
          {/* Aquí puedes poner tu logo, avatar o iniciales */}
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
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: '#EBE4DD', // cream
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
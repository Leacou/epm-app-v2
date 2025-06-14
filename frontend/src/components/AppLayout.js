import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, CssBaseline } from '@mui/material';

export default function AppLayout({ children }) {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EPM App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="md">
          {children}
        </Container>
      </Box>
    </>
  );
}
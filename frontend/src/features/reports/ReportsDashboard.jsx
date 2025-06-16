import React, { useState } from 'react';
import AppLayout from '../../components/AppLayout';
import AsideMenu from './components/AsideMenu';
import Last30DaysReport from './components/Last30DaysReport';
import LastPostMetricas from './components/LastPostMetricas';
// import RequestCustomReportForm from './components/RequestCustomReportForm';
import { Box, Grid } from '@mui/material';

export default function ReportsDashboard() {
  const [selectedMenu, setSelectedMenu] = useState('last30');

  return (
    <AppLayout>
      <Grid container sx={{ height: '100vh', minHeight: '100vh' }} wrap="nowrap">
        {/* AsideMenu a la izquierda */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            bgcolor: '#f3f0ee',
            minHeight: '100vh',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            px: 0,
            pt: 0
          }}
        >
          <AsideMenu selected={selectedMenu} onSelect={setSelectedMenu} />
        </Grid>
        {/* Contenido a la derecha */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            height: '100vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: "#f9f9f8"
          }}
        >
          <Box sx={{ p: { xs: 1, sm: 3, md: 6 }, flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 1200, mx: "auto" }}>
            {selectedMenu === 'last30' && <Last30DaysReport />}
            {selectedMenu === 'lastPosts' && <LastPostMetricas />}
            {/* {selectedMenu === 'custom' && <RequestCustomReportForm />} */}
          </Box>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
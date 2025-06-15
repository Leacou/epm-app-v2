import React, { useState } from 'react';
import AppLayout from '../../components/AppLayout'; // ajusta el path si es necesario
import AsideMenu from './components/AsideMenu';
import Last30DaysReport from './components/Last30DaysReport';
// import LastPostsReport from './components/LastPostsReport';
// import RequestCustomReportForm from './components/RequestCustomReportForm';
import { Box, Grid } from '@mui/material';

export default function ReportsDashboard() {
  const [selectedMenu, setSelectedMenu] = useState('last30');

  return (
    <AppLayout>
      <Grid container sx={{ height: '100vh', minHeight: '100vh' }} wrap="nowrap">
        {/* AsideMenu a la izquierda */}
        <Grid item xs={12} md={2} sx={{ bgcolor: '#f3f0ee', minHeight: '100vh', height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AsideMenu selected={selectedMenu} onSelect={setSelectedMenu} />
        </Grid>
        {/* Contenido a la derecha */}
        <Grid item xs={12} md={10} sx={{ height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: { xs: 2, md: 4 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
            {selectedMenu === 'last30' && <Last30DaysReport />}
            {/* {selectedMenu === 'lastPosts' && <LastPostsReport />} */}
            {/* {selectedMenu === 'custom' && <RequestCustomReportForm />} */}
          </Box>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
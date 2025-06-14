import React, { useState } from 'react';
import AsideMenu from './components/AsideMenu';
import Last30DaysReport from './components/Last30DaysReport';
import LastPostsReport from './components/LastPostsReport';
import RequestCustomReportForm from './components/RequestCustomReportForm';
import { Box, Grid, Paper } from '@mui/material';

export default function ReportsDashboard() {
  const [selectedMenu, setSelectedMenu] = useState('last30');

  return (
    <Grid container>
      <Grid item xs={12} md={2} sx={{ bgcolor: '#f3f0ee', minHeight: '100vh' }}>
        <AsideMenu selected={selectedMenu} onSelect={setSelectedMenu} />
      </Grid>
      <Grid item xs={12} md={10}>
        <Box sx={{ p: 4 }}>
          {selectedMenu === 'last30' && <Last30DaysReport />}
          {selectedMenu === 'lastPosts' && <LastPostsReport />}
          {selectedMenu === 'custom' && <RequestCustomReportForm />}
        </Box>
      </Grid>
    </Grid>
  );
}
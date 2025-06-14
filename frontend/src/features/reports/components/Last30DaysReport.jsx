import React, { useEffect, useState } from 'react';
import getLast30DaysReport from '../api/getLast30DaysReport';
import ReportChart from './ReportChart';
import { CircularProgress, Alert } from '@mui/material';

export default function Last30DaysReport() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLast30DaysReport()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!data?.length) return <Alert severity="info">No hay datos disponibles para los últimos 30 días.</Alert>;

  return <ReportChart data={data} />;
}
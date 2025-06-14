import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#083963', // blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#EB8957', // orange
      contrastText: '#fff',
    },
    background: {
      default: '#EBE4DD', // cream
      paper: '#fff',
    },
    text: {
      primary: '#1a2330',
    },
    info: {
      main: '#5DA9DD', // light-blue
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      'Montserrat',
      'Arial',
      'Helvetica',
      'sans-serif'
    ].join(','),
    h1: {
      fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
      fontWeight: 700,
      color: '#083963',
    },
    h2: {
      fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
      fontWeight: 600,
      color: '#083963',
    },
    h3: {
      fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
      fontWeight: 600,
      color: '#083963',
    },
    h4: {
      fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
      fontWeight: 700,
      color: '#083963',
    },
    body1: {
      fontFamily: 'Lato, Arial, Helvetica, sans-serif',
      fontWeight: 400,
      color: '#1a2330',
    },
    body2: {
      fontFamily: 'Lato, Arial, Helvetica, sans-serif',
      fontWeight: 500,
      color: '#1a2330',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 16px rgba(8,57,99,0.06)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#083963',
        },
      },
    },
  },
});

export default theme;
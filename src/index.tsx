import { ThemeProvider, createTheme } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { setupStore } from './redux/store';
import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    darkPurple: string;
  }
}

initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const theme = createTheme({
  palette: {
    secondary: {
      main: '#f4f7fd',
    },
    common: {
      darkPurple: '#0C1643',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#0C1643'
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 990,
      lg: 1440,
      xl: 1900
    }
  }
});

const store = setupStore();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);

import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import colors from './app/style/colors';
import PrivateRoutes from './app/routes/Routes';
import useAuth from "./app/useAuth"
import Login from './app/auth/Login';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: '#fff',
    },
    secondary: {
      main: colors.secondary,
      contrastText: '#fff',
    },
    background: {
      default: colors.bgColor,
    },
  },
  typography: {
    fontFamily: "Montserrat",
    body1: {
      fontSize: 14,
      fontWeight: 400
    },
    body2: {
      fontSize: 12,
      fontWeight: 400
    },
  },

})

function App() {

  const { user } = useAuth();

  return (

    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <Routes >
          <Route element={user ? <Outlet/> : <Navigate to='/login' />} >
            {PrivateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>
          <Route element={user ? <Navigate to="/" /> : <Outlet />}>
              <Route
                path={"/login"}
                element={<Login/>}
              />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

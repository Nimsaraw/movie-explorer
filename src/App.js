import React, { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useMovies } from './context/MovieContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';

export default function App() {
  const { mode, user } = useMovies();

  const theme = useMemo(() => {
    const dark = mode === 'dark';
    const heading = { fontFamily: '"Bebas Neue", sans-serif', fontWeight: 400, letterSpacing: '.03em', textTransform: 'uppercase' };
    return createTheme({
      palette: {
        mode,
        primary: { main: dark ? '#f0b840' : '#d99512', contrastText: '#1a1206' },
        background: dark ? { default: '#100d0b', paper: '#17130f' } : { default: '#faf6ee', paper: '#ffffff' },
        text: dark ? { primary: '#f5efe6', secondary: '#a89b8a' } : { primary: '#1a1410', secondary: '#6f6353' },
        divider: dark ? 'rgba(255,255,255,.09)' : 'rgba(0,0,0,.10)',
      },
      typography: {
        fontFamily: '"DM Sans", sans-serif',
        h3: { ...heading, fontSize: '2.6rem' }, h4: { ...heading, fontSize: '2.1rem' },
        h5: { ...heading, fontSize: '1.7rem' }, h6: heading,
        button: { textTransform: 'none', fontWeight: 700 },
      },
      shape: { borderRadius: 14 },
      components: {
        MuiButton: { styleOverrides: { root: { borderRadius: 999 }, containedPrimary: { boxShadow: 'none' } } },
        MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 14, backgroundColor: dark ? 'rgba(0,0,0,.35)' : 'rgba(0,0,0,.03)' } } },
        MuiCard: { styleOverrides: { root: { backgroundImage: 'none', border: `1px solid ${dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)'}`, overflow: 'hidden' } } },
        MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
        MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
      },
    });
  }, [mode]);

  const Private = ({ children }) => (user ? children : <Navigate to="/login" replace />);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={<Private><Home /></Private>} />
        <Route path="/movie/:id" element={<Private><MovieDetails /></Private>} />
        <Route path="/favorites" element={<Private><Favorites /></Private>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box, Badge, Avatar } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Logo from './Logo';
import { useMovies } from '../context/MovieContext';

export default function Navbar() {
  const { mode, toggleMode, setUser, user, favorites } = useMovies();
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" elevation={0}
      sx={{ bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(16,13,11,.78)' : 'rgba(250,246,238,.82)'),
        backdropFilter: 'blur(14px)', borderBottom: 1, borderColor: 'divider', color: 'text.primary', backgroundImage: 'none' }}>
      <Toolbar sx={{ gap: 0.5 }}>
        <Box sx={{ flexGrow: 1 }}><Logo to={user ? '/' : '/login'} /></Box>
        {user && (
          <Button component={RouterLink} to="/favorites" color="inherit" sx={{ color: 'text.secondary' }}
            startIcon={<Badge badgeContent={favorites.length} color="primary" max={99}><FavoriteBorderIcon /></Badge>}>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: 0.5 }}>Favorites</Box>
          </Button>
        )}
        <IconButton onClick={toggleMode} aria-label="Toggle light and dark mode" sx={{ color: 'text.secondary' }}>
          {mode === 'dark' ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
        </IconButton>
        {user ? (
          <>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', color: '#1a1206', fontWeight: 700, fontSize: 14, mx: 0.5 }}>
              {user[0].toUpperCase()}
            </Avatar>
            <Button variant="contained" size="small" onClick={() => { setUser(null); navigate('/login'); }}>Log out</Button>
          </>
        ) : (
          <Button variant="contained" size="small" component={RouterLink} to="/login">Sign in</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

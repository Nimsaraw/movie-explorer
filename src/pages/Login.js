import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { LogoMark } from '../components/Logo';
import { useMovies } from '../context/MovieContext';

// Front-end only sign-in (assignment scope). Any username + password of 4+ chars works.
export default function Login() {
  const { setUser } = useMovies();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const submit = () => {
    if (!username.trim()) return setError('Enter a username.');
    if (password.length < 4) return setError('Password must be at least 4 characters.');
    setUser(username.trim());
  };

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 57px)', display: 'grid', placeItems: 'center', p: 2,
      background: (t) => t.palette.mode === 'dark'
        ? 'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(240,184,64,.16), transparent 70%)'
        : 'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(240,184,64,.28), transparent 70%)',
    }}>
      <Paper elevation={0} sx={{
        p: { xs: 3, sm: 4 }, width: '100%', maxWidth: 420, display: 'grid', gap: 2, borderRadius: 5,
        border: 1, borderColor: 'divider', boxShadow: '0 30px 80px rgba(0,0,0,.35)',
      }}>
        <LogoMark size={44} />
        <Typography variant="h3" sx={{ lineHeight: 1 }}>Welcome back</Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mt: -0.5 }}>
          Sign in to explore trending films and keep a list of your favorites.
        </Typography>
        {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}
        <Box>
          <Typography variant="body2" fontWeight={700} sx={{ mb: 0.75 }}>Username</Typography>
          <TextField fullWidth value={username} autoFocus autoComplete="username"
            onChange={(e) => setUsername(e.target.value)} inputProps={{ 'aria-label': 'Username' }} />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={700} sx={{ mb: 0.75 }}>Password</Typography>
          <TextField fullWidth type={show ? 'text' : 'password'} value={password} autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()}
            inputProps={{ 'aria-label': 'Password' }}
            InputProps={{ endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setShow((s) => !s)} aria-label="Toggle password visibility">
                  {show ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                </IconButton>
              </InputAdornment>) }} />
        </Box>
        <Button variant="contained" size="large" fullWidth onClick={submit} sx={{ py: 1.4, borderRadius: 3, fontSize: 16 }}>Sign in</Button>
        <Typography variant="caption" color="text.secondary">
          Demo sign-in: any username with a password of 4+ characters. Your session is stored on this device only.
        </Typography>
      </Paper>
    </Box>
  );
}

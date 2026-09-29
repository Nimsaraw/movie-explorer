import React from 'react';
import { Container, Typography } from '@mui/material';
import MovieGrid from '../components/MovieGrid';
import { useMovies } from '../context/MovieContext';

export default function Favorites() {
  const { favorites } = useMovies();
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Your favorites</Typography>
      {favorites.length === 0
        ? <Typography color="text.secondary">Nothing saved yet. Tap the heart on any movie to add it here.</Typography>
        : <MovieGrid movies={favorites} />}
    </Container>
  );
}

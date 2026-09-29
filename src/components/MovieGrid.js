import React from 'react';
import { Grid } from '@mui/material';
import MovieCard from './MovieCard';

// Mobile-first: 2 columns on phones, growing with screen width.
export default function MovieGrid({ movies }) {
  return (
    <Grid container spacing={2}>
      {movies.map((m) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={m.id}><MovieCard movie={m} /></Grid>
      ))}
    </Grid>
  );
}

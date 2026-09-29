import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Chip, Button, CircularProgress, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getMovie, IMG, friendlyError } from '../api/tmdb';
import { useMovies } from '../context/MovieContext';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovies();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setMovie(null); setError('');
    getMovie(id).then(setMovie).catch((e) => setError(friendlyError(e)));
  }, [id]);

  if (error) return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert><Button onClick={() => navigate('/')} sx={{ mt: 2 }}>Back to movies</Button></Container>;
  if (!movie) return <Box sx={{ textAlign: 'center', py: 8 }}><CircularProgress /></Box>;

  // TMDb returns video keys; the YouTube embed link uses that key.
  const trailer = movie.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
  const cast = movie.credits?.cast.slice(0, 6).map((c) => c.name).join(', ');
  const fav = isFavorite(movie.id);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box component="img" src={IMG(movie.poster_path, 'w500')} alt={movie.title}
          sx={{ width: { xs: '100%', md: 320 }, maxWidth: 360, alignSelf: 'flex-start', borderRadius: 1 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3">{movie.title}</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {movie.release_date?.slice(0, 4)} • {movie.runtime} min • ★ {movie.vote_average?.toFixed(1)} rating
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {movie.genres.map((g) => <Chip key={g.id} label={g.name} />)}
          </Box>
          <Typography paragraph sx={{ maxWidth: '65ch' }}>{movie.overview || 'No description available.'}</Typography>
          {cast && <Typography color="text.secondary" paragraph>Cast: {cast}</Typography>}
          <Button variant={fav ? 'outlined' : 'contained'} onClick={() => toggleFavorite(movie)}
            startIcon={fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}>
            {fav ? 'Remove from favorites' : 'Save to favorites'}
          </Button>
        </Box>
      </Box>

      {trailer && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Trailer</Typography>
          <Box sx={{ position: 'relative', pb: '56.25%', height: 0 }}>
            <iframe title={`${movie.title} trailer`} src={`https://www.youtube.com/embed/${trailer.key}`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} allowFullScreen />
          </Box>
        </Box>
      )}
    </Container>
  );
}

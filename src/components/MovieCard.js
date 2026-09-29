import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IMG } from '../api/tmdb';
import { useMovies } from '../context/MovieContext';

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite, setLastMovie } = useMovies();
  const fav = isFavorite(movie.id);
  const year = movie.release_date?.slice(0, 4) || 'N/A';
  const poster = IMG(movie.poster_path);

  return (
    <Card sx={{ position: 'relative', height: '100%', borderRadius: 3, transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 30px rgba(0,0,0,.35)' } }}>
      <CardActionArea component={Link} to={`/movie/${movie.id}`} onClick={() => setLastMovie({ id: movie.id, title: movie.title })}>
        {poster ? (
          <CardMedia component="img" image={poster} alt={movie.title} loading="lazy" sx={{ aspectRatio: '2/3' }} />
        ) : (
          <Box sx={{ aspectRatio: '2/3', display: 'grid', placeItems: 'center', bgcolor: 'action.hover' }}>No poster</Box>
        )}
        <CardContent sx={{ py: 1.5 }}>
          <Typography variant="subtitle2" noWrap title={movie.title}>{movie.title}</Typography>
          <Typography variant="caption" color="text.secondary">
            {year} • ★ {movie.vote_average ? movie.vote_average.toFixed(1) : '–'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <IconButton
        onClick={() => toggleFavorite(movie)} aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)', color: fav ? 'primary.main' : '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,.75)' } }}
        size="small"
      >
        {fav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
      </IconButton>
    </Card>
  );
}

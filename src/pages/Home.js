import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Button, Select, MenuItem, FormControl, InputLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import MovieCard from '../components/MovieCard';
import { getTrending, searchMovies, discoverMovies, getGenres, friendlyError } from '../api/tmdb';
import { useMovies } from '../context/MovieContext';

export default function Home() {
  const { lastSearch, setLastSearch, lastMovie } = useMovies();
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [pagingMode, setPagingMode] = useState('infinite'); // 'infinite' | 'more'
  const sentinel = useRef(null);

  // Trending strip (always visible) + genre list for the filter
  useEffect(() => {
    getTrending().then((d) => setTrending(d.results.slice(0, 12))).catch((e) => setError(friendlyError(e)));
    getGenres().then(setGenres).catch(() => {});
  }, []);

  // Main list: search results if there is a query, otherwise popular movies (filterable).
  const load = useCallback(async (p, reset = false) => {
    setLoading(true); setError('');
    try {
      const data = lastSearch ? await searchMovies(lastSearch, p, year) : await discoverMovies(p, genre, year);
      setMovies((prev) => (reset ? data.results : [...prev, ...data.results]));
      setTotalPages(data.total_pages);
      setPage(p);
    } catch (err) { setError(friendlyError(err)); }
    finally { setLoading(false); }
  }, [lastSearch, genre, year]);

  useEffect(() => { load(1, true); }, [load]);

  // Infinite scroll (only when that mode is selected)
  useEffect(() => {
    const el = sentinel.current;
    if (!el || pagingMode !== 'infinite') return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !loading && !error && page < totalPages) load(page + 1);
    }, { rootMargin: '400px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [load, loading, error, page, totalPages, pagingMode]);

  // Search endpoint has no genre filter, so filter search results on the client.
  const shown = lastSearch && genre ? movies.filter((m) => m.genre_ids?.includes(genre)) : movies;
  const years = Array.from({ length: 40 }, (_, i) => String(new Date().getFullYear() - i));

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>Discover your next <Box component="span" sx={{ color: 'primary.main' }}>favourite film</Box></Typography>
      <SearchBar initial={lastSearch} onSearch={setLastSearch} />
      {lastMovie && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Last viewed: <Link to={`/movie/${lastMovie.id}`}>{lastMovie.title}</Link>
        </Typography>
      )}

      {trending.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 1.5 }}>Trending this week</Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {trending.map((m) => <Box key={m.id} sx={{ flex: '0 0 140px' }}><MovieCard movie={m} /></Box>)}
          </Box>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', my: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {lastSearch ? `Results for "${lastSearch}"` : 'Popular movies'}
        </Typography>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Genre</InputLabel>
          <Select label="Genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <MenuItem value="">All genres</MenuItem>
            {genres.map((g) => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 110 }}>
          <InputLabel>Year</InputLabel>
          <Select label="Year" value={year} onChange={(e) => setYear(e.target.value)}>
            <MenuItem value="">Any year</MenuItem>
            {years.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
          </Select>
        </FormControl>
        <ToggleButtonGroup size="small" exclusive value={pagingMode} onChange={(_, v) => v && setPagingMode(v)} aria-label="Paging mode">
          <ToggleButton value="infinite">Infinite scroll</ToggleButton>
          <ToggleButton value="more">Load more</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {error && (
        <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => load(page, page === 1)}>Retry</Button>} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && shown.length === 0 && (
        <Typography color="text.secondary">No movies found. Try a different title or clear the filters.</Typography>
      )}

      <MovieGrid movies={shown} />
      <Box ref={sentinel} sx={{ height: 1 }} />
      {loading && <Box sx={{ textAlign: 'center', py: 3 }}><CircularProgress /></Box>}
      {pagingMode === 'more' && !loading && page < totalPages && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Button variant="outlined" size="large" onClick={() => load(page + 1)}>Load more</Button>
        </Box>
      )}
    </Container>
  );
}

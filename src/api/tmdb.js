import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
});

export const IMG = (path, size = 'w342') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

// Turn any axios failure into a message a person can act on.
export const friendlyError = (err) => {
  if (!process.env.REACT_APP_TMDB_API_KEY) return 'Missing TMDb API key. Add REACT_APP_TMDB_API_KEY to your .env file.';
  if (err.response?.status === 401) return 'TMDb rejected the API key. Check that it is correct.';
  if (err.response?.status === 404) return 'That movie could not be found.';
  if (err.response?.status === 429) return 'Too many requests. Wait a moment and try again.';
  if (!err.response) return 'Cannot reach TMDb. Check your internet connection.';
  return 'Something went wrong while loading movies. Try again.';
};

export const getTrending = (page = 1) => api.get('/trending/movie/week', { params: { page } }).then((r) => r.data);
export const searchMovies = (query, page = 1, year) => api.get('/search/movie', { params: { query, page, year: year || undefined } }).then((r) => r.data);
export const discoverMovies = (page = 1, genre, year) => api.get('/discover/movie', { params: { page, sort_by: 'popularity.desc', with_genres: genre || undefined, primary_release_year: year || undefined } }).then((r) => r.data);
export const getMovie = (id) => api.get(`/movie/${id}`, { params: { append_to_response: 'videos,credits' } }).then((r) => r.data);
export const getGenres = () => api.get('/genre/movie/list').then((r) => r.data.genres);

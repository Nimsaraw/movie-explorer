import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

// Safe localStorage helpers
const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export function MovieProvider({ children }) {
  const [user, setUser] = useState(() => load('me_user', null));
  const [mode, setMode] = useState(() => load('me_mode', 'dark'));
  const [lastSearch, setLastSearch] = useState(() => load('me_lastSearch', ''));
  const [favorites, setFavorites] = useState(() => load('me_favorites', []));
  const [lastMovie, setLastMovie] = useState(() => load('me_lastMovie', null));

  useEffect(() => save('me_user', user), [user]);
  useEffect(() => save('me_mode', mode), [mode]);
  useEffect(() => save('me_lastSearch', lastSearch), [lastSearch]);
  useEffect(() => save('me_favorites', favorites), [favorites]);
  useEffect(() => save('me_lastMovie', lastMovie), [lastMovie]);

  const toggleFavorite = useCallback((movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, { id: movie.id, title: movie.title, poster_path: movie.poster_path,
            release_date: movie.release_date, vote_average: movie.vote_average }]
    );
  }, []);

  const value = useMemo(() => ({
    user, setUser, mode, toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    lastSearch, setLastSearch, lastMovie, setLastMovie, favorites, toggleFavorite,
    isFavorite: (id) => favorites.some((m) => m.id === id),
  }), [user, mode, lastSearch, lastMovie, favorites, toggleFavorite]);

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

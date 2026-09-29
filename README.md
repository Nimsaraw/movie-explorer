# Movie Explorer

A React web app to search movies, browse trending and popular films, read details, watch trailers and save favorites. Data comes from the [TMDb API](https://developers.themoviedb.org/3).

**Live demo:** _add your Vercel/Netlify link here_

## Features
- Login screen (front-end only: any username + a password of 4+ characters)
- Search bar, poster grid (poster, title, year, rating)
- Trending movies section + popular movies list
- Infinite scroll **and** a "Load more" button (switch with the toggle)
- Movie details page: overview, genres, rating, runtime, cast, YouTube trailer
- Light/dark mode (remembered)
- Last searched query and last viewed movie saved in `localStorage`
- Favorites list saved in `localStorage`
- Filter by genre and year
- Friendly error messages (bad key, offline, rate limit, not found) with a Retry button
- Mobile-first responsive layout (2 columns on phones, up to 6 on large screens)

## Tech
React (Create React App), axios, Material-UI, React Router, React Context.

## Setup
```bash
npm install
cp .env.example .env     # Windows: copy .env.example .env
# put your TMDb v3 API key in .env
npm start                # http://localhost:3000
npm test                 # unit tests
```
Get a free key at https://www.themoviedb.org/settings/api (use the short **API Key**, not the Read Access Token).

## API usage
| Purpose | Endpoint |
|---|---|
| Trending | `/trending/movie/week` |
| Search | `/search/movie` (`query`, `page`, `year`) |
| Popular / filters | `/discover/movie` (`with_genres`, `primary_release_year`) |
| Details + trailer + cast | `/movie/{id}?append_to_response=videos,credits` |
| Genres | `/genre/movie/list` |

All calls go through `src/api/tmdb.js`, which also turns errors into readable messages.

## Structure
```
src/
  api/tmdb.js              axios client, endpoints, error messages
  context/MovieContext.js  user, theme, favorites, last search/movie (persisted)
  components/              Navbar, SearchBar, MovieCard, MovieGrid
  pages/                   Login, Home, MovieDetails, Favorites
```

## Deploy
Vercel or Netlify: import the repo, build command `npm run build`, output `build`, and add the environment variable `REACT_APP_TMDB_API_KEY`. `vercel.json` and `public/_redirects` are included so page refreshes on routes like `/favorites` work.

> Never commit `.env` (it is in `.gitignore`).

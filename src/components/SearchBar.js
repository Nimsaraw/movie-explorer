import React, { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ initial = '', onSearch }) {
  const [text, setText] = useState(initial);
  const submit = (e) => { e.preventDefault(); onSearch(text.trim()); };
  return (
    <Paper component="div" sx={{ display: 'flex', alignItems: 'center', px: 2.5, py: 0.5, maxWidth: 680, borderRadius: 999, border: 1, borderColor: 'divider', '&:focus-within': { borderColor: 'primary.main' } }} elevation={0}>
      <InputBase
        fullWidth placeholder="Search for a movie title" value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit(e)}
        inputProps={{ 'aria-label': 'Search movies' }}
      />
      <IconButton onClick={submit} aria-label="Search"><SearchIcon /></IconButton>
    </Paper>
  );
}

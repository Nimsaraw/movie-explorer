import React, { useId } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// Clapperboard + play button mark
export function LogoMark({ size = 32 }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd166" />
          <stop offset="1" stopColor="#e8962a" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M13 28h38v20a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4z" />
        <path d="M12 20l38-8 2 8-38 8z" />
        <path d="M22 17.5l5 8M33 15l5 8M44 12.5l5 8" strokeWidth="3.5" />
      </g>
      <path d="M28 34l10 6-10 6z" fill={`url(#${id})`} />
    </svg>
  );
}

export default function Logo({ size = 32, to = '/', withText = true }) {
  return (
    <Box component={RouterLink} to={to} aria-label="Movie Explorer home"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'text.primary' }}>
      <LogoMark size={size} />
      {withText && (
        <Typography component="span" sx={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: size * 0.85, letterSpacing: '.04em', lineHeight: 1 }}>
          MOVIE <Box component="span" sx={{ color: 'primary.main' }}>EXPLORER</Box>
        </Typography>
      )}
    </Box>
  );
}

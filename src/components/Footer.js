import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const Footer = () => {
  return (
    <Box position={'sticky'}
      sx={{
        backgroundColor: '#00ADB5',
        color: 'white',
        fontWeight: 700,
        fontSize: 14,
      }} >
      <Typography padding={1} textAlign='center'>Made with ♥️ by AnimeKayo</Typography>
    </Box>
  )
}

export default Footer
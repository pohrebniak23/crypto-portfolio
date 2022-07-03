import { Box, Typography, Paper } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';

export const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        borderRadius: 3,
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          borderRadius: 3,
          p: 2,
        }}
      >
        {user !== null && (
          <Typography variant="h4">Hi {user.username}</Typography>
        )}
      </Box>
    </Paper>
  );
};

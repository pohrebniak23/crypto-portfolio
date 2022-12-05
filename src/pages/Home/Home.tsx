import { Box, Paper, Typography } from '@mui/material';
import { getUserData } from 'entities/User/model/selectors/getUserData';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';

export const Home: React.FC = () => {
  const user = useAppSelector(getUserData);

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
        {user && (
          <Typography variant="h4">Hi {user.username}</Typography>
        )}
      </Box>
    </Paper>
  );
};

import { Box, Paper, Typography } from '@mui/material';
import { getUserData } from 'entities/User/model/selectors/getUserData';
import { Cryptocurrencies } from 'features/GetCryptocurrencies';
import React from 'react';
import { useAppSelector } from '../../shared/hooks/redux';

export const HomePage: React.FC = () => {
  const user = useAppSelector(getUserData);

  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        borderRadius: 3,
        p: 2,
        position: 'relative',
        height: 'calc(100vh - 16px)',
        overflowY: 'hidden'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          mb: 2,
          pb: 2
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Hi {user?.name}
        </Typography>

        <Cryptocurrencies />
      </Box>
    </Paper>
  );
};

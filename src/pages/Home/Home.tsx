import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';

export const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'secondary.main',
        height: 'calc(100vh - 32px)',
        borderRadius: 7,
        padding: 2,
        margin: 2,
        ml: 0,
      }}
    >
      {user !== null && (
        <Typography variant="h4">Hi {user.username}</Typography>
      )}
    </Box>
  );
};

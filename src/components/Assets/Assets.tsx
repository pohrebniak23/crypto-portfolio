import React from 'react';
import { Paper, Typography } from '@mui/material';
import { AssetsList } from './parts/AssetsList';

export const Assets = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        p: 3,
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 'max-content',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Assets
      </Typography>

      <AssetsList />
    </Paper>
  );
};

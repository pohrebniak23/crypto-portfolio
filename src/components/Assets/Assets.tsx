import React from 'react';
import { Paper, Typography } from '@mui/material';
// import { AssetsList } from './parts/AssetsList';

export const Assets: React.FC = () => (
  <Paper
    elevation={3}
    sx={{
      width: '100%',
      pt: 1,
      px: 2,
      pb: 1,
      backgroundColor: '#fff',
      borderRadius: 3,
      height: 'max-content',
    }}
  >
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      Assets
    </Typography>

    {/* <AssetsList /> */}
  </Paper>
);

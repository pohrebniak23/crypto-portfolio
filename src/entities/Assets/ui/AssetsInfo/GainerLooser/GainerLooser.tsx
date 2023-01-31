import { Box, Typography } from '@mui/material';
import React from 'react';
import { TopGainerLooser } from 'shared/helpers/portfolioInfo';

interface GainerLooserProps {
  title: string;
  data: TopGainerLooser;
  profit: number | null;
}

export const GainerLooser = React.memo(
  ({ title, data, profit }: GainerLooserProps) => (
    <Box
      sx={{
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
        pl: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="body2" sx={{ color: '#757575', mr: 5 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ mr: 4}}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '40px', height: '40px', mr: '8px' }}>
              <img src={data.coin.image} style={{ width: '100%' }} alt="" />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="subtitle2"
                sx={{ color: '#000', fontWeight: '600' }}
              >
                {data.coin.symbol.toUpperCase()}
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575' }}>
                {data.coin.name}
              </Typography>
            </Box>
          </Box>
        </Box>
        {profit && (
          <Box
            sx={{
              color: profit > 0 ? 'rgba(22,163,74,1)' : 'rgba(220,38,38,1)',
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: '100%', mb: 1 }}>
              {data.profit.toFixed(2)}$
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: '100%', textAlign: 'right' }}
            >
              {data.percent.toFixed(2)}%
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  ),
);

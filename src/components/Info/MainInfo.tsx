import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import {
  allTimeProfit,
  GainerLooser,
  topGainerLooser,
  walletSum,
} from '../../shared/helpers/portfolioInfo';
import { useAppSelector } from '../../shared/hooks/redux';
import { coinsAPI } from '../../services/CoinsService';
import { InfoGainerLooser } from './InfoGainerLooser';

export const MainInfo: React.FC = React.memo(() => {
  const { data: coinsList } = coinsAPI.useFetchAllCoinsQuery('', {
    pollingInterval: 60000,
  });
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);

  const sum = walletSum(coinsList, portfolio);
  const profit = allTimeProfit(coinsList, portfolio);
  const profitPercent = (profit * 100) / +sum;

  const gainer: GainerLooser | null | undefined = topGainerLooser(
    coinsList,
    portfolio,
    'gainer',
  );
  const looser: GainerLooser | null | undefined = topGainerLooser(
    coinsList,
    portfolio,
    'looser',
  );

  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: '#fff',
          borderRadius: 3,
          height: 'max-content',
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
            Total sum
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {sum.toLocaleString()} $
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: '#757575' }}>
            All time profit
          </Typography>
          <Box
            sx={{
              color: profit > 0 ? 'rgba(22,163,74,1)' : 'rgba(220,38,38,1)',
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: '100%', mb: 0.5 }}>
              {profit.toFixed(2)}$
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: '100%', textAlign: 'right' }}
            >
              {profitPercent.toFixed(2)}%
            </Typography>
          </Box>
        </Box>

        {gainer !== null && (
          <InfoGainerLooser title="Top gainer" data={gainer} profit={profit} />
        )}

        {looser !== null && (
          <InfoGainerLooser title="Top looser" data={looser} profit={profit} />
        )}
      </Paper>
    </Grid>
  );
});

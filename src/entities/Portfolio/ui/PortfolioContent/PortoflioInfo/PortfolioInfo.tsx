import { Box, Grid, Paper, Typography } from '@mui/material';
import { getPortfolioDataSelector } from 'entities/Portfolio';
import React from 'react';
import { coinsAPI } from 'services/CoinsService';
import {
  TopGainerLooserProps,
  allTimeProfit,
  topGainerLooser,
  walletSum,
} from 'shared/helpers/portfolioInfo';
import { useAppSelector } from 'shared/hooks/redux';
import { GainerLooser } from './GainerLooser/GainerLooser';

export const PortfolioInfo: React.FC = React.memo(() => {
  const { data: coinsList } = coinsAPI.useFetchAllCoinsQuery('', {
    pollingInterval: 60000,
  });
  const portfolio = useAppSelector(getPortfolioDataSelector);

  const walletSumPrice = Number(walletSum(coinsList, portfolio));
  const profit = allTimeProfit(coinsList, portfolio);
  const profitPercent = profit && (profit * 100) / walletSumPrice;

  const gainer: TopGainerLooserProps | null = topGainerLooser({
    coins: coinsList,
    portfolio,
    type: 'gainer',
  });

  const looser: TopGainerLooserProps | null = topGainerLooser({
    coins: coinsList,
    portfolio,
    type: 'looser',
  });

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
            {walletSumPrice.toLocaleString()} $
          </Typography>
        </Box>

        {profit && (
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
              {profitPercent && (
                <Typography
                  variant="body2"
                  sx={{ lineHeight: '100%', textAlign: 'right' }}
                >
                  {profitPercent.toFixed(2)}%
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {gainer !== null && (
          <GainerLooser title="Top gainer" data={gainer} profit={profit} />
        )}

        {looser !== null && (
          <GainerLooser title="Top looser" data={looser} profit={profit} />
        )}
      </Paper>
    </Grid>
  );
});

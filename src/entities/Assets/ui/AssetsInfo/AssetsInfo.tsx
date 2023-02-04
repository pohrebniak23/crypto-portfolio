import { Box, Grid, Paper, Typography } from '@mui/material';
import { coinsAPI } from 'entities/Coin';
import React from 'react';
import {
  TopGainerLooserProps,
  allTimeProfit,
  topGainerLooser,
  walletSum,
} from 'shared/helpers/portfolioInfo';
import { useAppSelector } from 'shared/hooks/redux';
import { getAssetsData } from '../../model/selectors/getPortfolioData';
import { GainerLooser } from './GainerLooser/GainerLooser';

export const AssetsInfo: React.FC = React.memo(() => {
  const { data: coinsList } = coinsAPI.useFetchMarketCoinsQuery({}, {
    pollingInterval: 60000,
  });
  const assets = useAppSelector(getAssetsData);

  const walletSumPrice = Number(walletSum(coinsList, assets));
  const profit = allTimeProfit(coinsList, assets);
  const profitPercent = profit && (profit * 100) / walletSumPrice;

  const gainer: TopGainerLooserProps | null = topGainerLooser({
    coins: coinsList,
    assets,
    type: 'gainer',
  });

  const looser: TopGainerLooserProps | null = topGainerLooser({
    coins: coinsList,
    assets,
    type: 'looser',
  });

  return (
    <Paper
      elevation={3}
      sx={{
        py: 2,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 3,
        height: 'max-content',
      }}
    >
      <Grid
        container
        item
        md={12}
        lg={12}
        xl={12}
        alignContent="start"
        alignItems="center"
        rowSpacing={5}
        columnSpacing={5}
      >
        <Grid item lg={4} xl={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" sx={{ color: '#757575' }}>
              Current balance
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
              }}
            >
              <Typography variant="body2" sx={{ color: '#757575' }}>
                All time profit
              </Typography>
              <Box
                sx={{
                  color: profit > 0 ? 'rgba(22,163,74,1)' : 'rgba(220,38,38,1)',
                  display: 'flex',
                }}
              >
                <Typography variant="body2" sx={{ lineHeight: '100%', mr: 2 }}>
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
        </Grid>

        {gainer && (
          <Grid item lg={4} xl={4}>
            <GainerLooser title="Top gainer" data={gainer} profit={profit} />
          </Grid>
        )}

        {looser && (
          <Grid item lg={4} xl={4}>
            <GainerLooser title="Top looser" data={looser} profit={profit} />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
});

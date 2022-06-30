import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import {
  allTimeProfit,
  GainerLooser,
  topGainerLooser,
} from '../../helpers/portfolioInfo';
import { coinsAPI } from '../../services/CoinsService';
import { Portfolio } from '../../types/Portfolio';
import { GainerLooserItem } from './GainerLooserItem';
import './portfolioInfo.sass';

type Props = {
  sum: number | string;
  portfolio: Portfolio[];
};

export const PortfolioInfo: React.FC<Props> = ({ sum, portfolio }) => {
  const { data: coins } = coinsAPI.useFetchAllCoinsQuery('');
  
  const profit = allTimeProfit(coins, portfolio);
  const profitPercent = (profit * 100) / +sum;


  const gainer: GainerLooser | null | undefined = topGainerLooser(
    coins,
    portfolio,
    'gainer',
  );
  const looser: GainerLooser | null | undefined = topGainerLooser(
    coins,
    portfolio,
    'looser',
  );

  return (
    <Paper
      elevation={3}
      sx={{
        minWidth: '320px',
        mr: 3,
        p: 3,
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 'max-content',
      }}
    >
      <Box>
        <Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
          Total sum
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {sum.toLocaleString()} $
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 2,
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
          <Typography variant="body1" sx={{ lineHeight: '100%', mb: 0.5 }}>
            {profit.toFixed(2)}$
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: '100%', textAlign: 'right' }}>
            {profitPercent.toFixed(2)}%
          </Typography>
        </Box>
      </Box>

      {gainer !== null && (
        <GainerLooserItem title="Top gainer" data={gainer} profit={profit} />
      )}

      {looser !== null && (
        <GainerLooserItem title="Top looser" data={looser} profit={profit} />
      )}
    </Paper>
  );
};

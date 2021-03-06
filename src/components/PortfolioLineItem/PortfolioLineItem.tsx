import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { coinsAPI } from '../../services/CoinsService';
import { Coin } from '../../types/Coin';
import { Portfolio } from '../../types/Portfolio';
import { StyledTableCell, StyledTableRow } from '../Material/StyledTable';
import { PortfolioMenu } from './PortfolioMenu';

type Props = {
  item: Portfolio;
};

export const PortfolioLineItem: React.FC<Props> = React.memo(({ item }) => {
  const { id, buyPrice, coinCount } = item;
  const { data: coins } = coinsAPI.useFetchAllCoinsQuery('');
  const [coinData, setCoinData] = useState<Coin | null>(null);

  useEffect(() => {
    if (coins) {
      const data = coins.find((coin: Coin) => coin.id === id) || null;

      setCoinData(data);
    }
  }, [coins, id]);

  return coinData !== null ? (
    <StyledTableRow
      key={coinData.name}
      sx={{ border: 'none', backgroundColor: 'unset !important' }}
    >
      <StyledTableCell
        component="th"
        scope="row"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <img
          style={{ width: '40px', height: 'auto', marginRight: '10px' }}
          src={coinData.image}
          alt=""
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="subtitle1"
            sx={{ color: '#000', fontWeight: '600' }}
          >
            {coinData.symbol.toUpperCase()}
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575' }}>
            {coinData.name}
          </Typography>
        </Box>
      </StyledTableCell>
      <StyledTableCell>
        <Typography variant="subtitle1">{coinData.current_price} $</Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Box
          sx={{
            color:
              coinData.price_change_percentage_24h > 0
                ? 'rgba(22,163,74,1)'
                : 'rgba(220,38,38,1)',
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: '100%', mb: 0.5 }}>
            {coinData.price_change_percentage_24h.toFixed(2)} %
          </Typography>
        </Box>
      </StyledTableCell>
      <StyledTableCell>
        <Box
          sx={{
            color:
              coinData.current_price * coinCount - buyPrice * coinCount > 0
                ? 'rgba(22,163,74,1)'
                : 'rgba(220,38,38,1)',
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: '100%', mb: 0.5 }}>
            {(
              coinData.current_price * coinCount -
              buyPrice * coinCount
            ).toFixed(2)}
            $
          </Typography>
        </Box>
      </StyledTableCell>

      <StyledTableCell>
        <Typography>{buyPrice.toFixed(2)}$</Typography>
      </StyledTableCell>

      <StyledTableCell>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body1" sx={{ lineHeight: '100%', mb: 0.5 }}>
            $ {(coinCount * coinData.current_price).toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: '100%' }}>
            {coinCount} {coinData.symbol.toUpperCase()}
          </Typography>
        </Box>
      </StyledTableCell>

      <StyledTableCell align="center">
        <Box>
          <PortfolioMenu id={id} />
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  ) : (
    <StyledTableRow>
      <StyledTableCell
        component="th"
        scope="row"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        Not found
      </StyledTableCell>
    </StyledTableRow>
  );
});

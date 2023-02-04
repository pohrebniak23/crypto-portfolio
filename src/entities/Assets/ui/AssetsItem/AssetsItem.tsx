import { Box, Typography } from '@mui/material';
import { Coin, coinsAPI } from 'entities/Coin';
import React, { useEffect, useState } from 'react';
import {
  StyledTableCell,
  StyledTableRow,
} from 'shared/ui/StyledTable/StyledTable';
import { AssetsMenu } from '../AssetsMenu/AssetsMenu';
import { AssetsData } from '../../model/types/AssetsSchema';

interface AssetsItemProps {
  assetsItem: AssetsData;
  transactionsToggle: (ticker: string) => void;
}

export const AssetsItem = React.memo(
  ({ assetsItem, transactionsToggle }: AssetsItemProps) => {
    const { id, avgBuyPrice, ticker, count } = assetsItem;

    const { data: coins } = coinsAPI.useFetchMarketCoinsQuery({});
    const [coinData, setCoinData] = useState<Coin | null>(null);

    useEffect(() => {
      if (coins) {
        const coin =
          coins.find((coinItem: Coin) => coinItem.id === ticker) || null;

        setCoinData(coin);
      }
    }, [coins, ticker]);

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
            style={{ width: '34px', height: 'auto', marginRight: '8px' }}
            src={coinData.image}
            alt=""
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body2"
              sx={{ color: '#000', fontWeight: '600' }}
            >
              {coinData.symbol.toUpperCase()}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#757575', fontSize: '14px' }}
            >
              {coinData.name}
            </Typography>
          </Box>
        </StyledTableCell>
        <StyledTableCell>
          <Typography variant="body2">{coinData.current_price} $</Typography>
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
            <Typography variant="body2" sx={{ lineHeight: '100%', mb: 0.5 }}>
              {coinData.price_change_percentage_24h.toFixed(2)} %
            </Typography>
          </Box>
        </StyledTableCell>
        <StyledTableCell>
          <Box
            sx={{
              color:
                coinData.current_price * count - avgBuyPrice * count > 0
                  ? 'rgba(22,163,74,1)'
                  : 'rgba(220,38,38,1)',
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: '100%', mb: 0.5 }}>
              {(coinData.current_price * count - avgBuyPrice * count).toFixed(
                2,
              )}
              $
            </Typography>
          </Box>
        </StyledTableCell>

        <StyledTableCell>
          <Typography>{Number(avgBuyPrice).toFixed(2)}$</Typography>
        </StyledTableCell>

        <StyledTableCell>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" sx={{ lineHeight: '100%', mb: 0.5 }}>
              $ {(count * coinData.current_price).toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: '100%' }}>
              {count.toFixed(4)} {coinData.symbol.toUpperCase()}
            </Typography>
          </Box>
        </StyledTableCell>

        <StyledTableCell align="center">
          <Box>
            <AssetsMenu
              transactionsToggle={transactionsToggle}
              coinId={id}
              coinTicker={ticker}
            />
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
  },
);

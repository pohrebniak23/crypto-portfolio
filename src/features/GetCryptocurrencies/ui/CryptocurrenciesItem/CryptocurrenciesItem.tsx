import { Box, Typography } from '@mui/material';
import { Coin } from 'entities/Coin';
import React, { useCallback } from 'react';
import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';
import { ProgressBar } from 'shared/ui/ProgressBar/ProgressBar';
import {
  StyledTableCell,
  StyledTableRow,
} from 'shared/ui/StyledTable/StyledTable';

interface CryptocurrenciesItemProps {
  cryptoItem: Coin;
}

export const CryptocurrenciesItem = React.memo(
  ({ cryptoItem }: CryptocurrenciesItemProps) => {
    const formatedChartData = useCallback(
      () =>
        cryptoItem.sparkline_in_7d.price.map((item) => ({
          value: item,
        })),
      [cryptoItem.sparkline_in_7d.price],
    );

    const formatToCurrency = new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'USD',
    });

    const formatToNumber = new Intl.NumberFormat('de-DE');

    return (
      <StyledTableRow
        sx={{ border: 'none', backgroundColor: 'unset !important' }}
      >
        <StyledTableCell>
          <Typography variant="body2" sx={{ color: '#000', fontWeight: '500' }}>
            {cryptoItem.market_cap_rank}
          </Typography>
        </StyledTableCell>

        <StyledTableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{ width: '34px', height: 'auto', marginRight: '8px' }}
            src={cryptoItem.image}
            alt=""
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body2"
              sx={{ color: '#000', fontWeight: '600' }}
            >
              {cryptoItem.symbol.toUpperCase()}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#757575', fontSize: '14px' }}
            >
              {cryptoItem.name}
            </Typography>
          </Box>
        </StyledTableCell>
        <StyledTableCell align="center">
          <Typography variant="body2">
            {formatToCurrency.format(cryptoItem.current_price)}
          </Typography>
        </StyledTableCell>

        <StyledTableCell align="center">
          <Box
            sx={{
              color:
                cryptoItem.price_change_percentage_24h > 0
                  ? 'rgba(22,163,74,1)'
                  : 'rgba(220,38,38,1)',
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: '100%', mb: 0.5 }}>
              {cryptoItem.price_change_percentage_24h.toFixed(2)} %
            </Typography>
          </Box>
        </StyledTableCell>

        <StyledTableCell align="center">
          <Typography variant="body2" sx={{ lineHeight: '100%', mb: 0.5 }}>
            {formatToCurrency.format(cryptoItem.market_cap)}
          </Typography>
        </StyledTableCell>

        <StyledTableCell>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: '100%', mb: 1 }}>
              {formatToNumber.format(cryptoItem.circulating_supply)}{' '}
              {cryptoItem.symbol.toUpperCase()}
            </Typography>

            {cryptoItem.circulating_supply !== cryptoItem.total_supply && (
              <Box sx={{ width: '100%' }}>
                <ProgressBar
                  value={cryptoItem.circulating_supply}
                  maxValue={cryptoItem.total_supply}
                  bgColor="rgb(239, 242, 245)"
                  percentColor="rgb(207, 214, 228)"
                  height="6px"
                />
              </Box>
            )}
          </Box>
        </StyledTableCell>

        <StyledTableCell
          align="center"
          sx={{ width: '200px', height: '73px', maxHeight: '73px', py: 1 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={100} height={100} data={formatedChartData()}>
              <YAxis hide domain={['dataMin', 'dataMax']} />
              <Line
                dot={false}
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </StyledTableCell>
      </StyledTableRow>
    );
  },
);

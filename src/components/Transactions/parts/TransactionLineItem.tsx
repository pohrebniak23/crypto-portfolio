import { Box, Typography } from '@mui/material';
import React from 'react';
import { Coin } from '../../../app/types/Coin';
import { Transaction } from '../../../app/types/Transaction';
import { StyledTableCell, StyledTableRow } from '../../UI/StyledTable';
import { TransactionMenu } from './TransactionMenu';

type Props = {
  item: Transaction;
  coinData: Coin;
};

export const TransactionLineItem: React.FC<Props> = React.memo(({ item, coinData }) =>
item && coinData ? (
  <StyledTableRow
    key={coinData.name}
    sx={{ border: 'none', backgroundColor: 'unset !important' }}
  >
    <StyledTableCell
      component="th"
      scope="row"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: '#000', fontWeight: '600', mr: 2 }}
      >
        {item.type}
      </Typography>
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
    <StyledTableCell align="center">
      <Typography variant="subtitle1">{item.buyPrice} $</Typography>
    </StyledTableCell>
    <StyledTableCell align="center">
      <Box
        sx={{
          color:
            item.type === 'BUY' ? 'rgba(22,163,74,1)' : 'rgba(220,38,38,1)',
          textAlign: 'right',
          margin: '0 auto',
          width: 'max-content',
        }}
      >
        {item.buyPrice && (
          <Typography variant="body1" sx={{ lineHeight: '100%', mb: 0.5 }}>
            +${item.buyPrice * item.coinCount}
          </Typography>
        )}
        <Typography variant="body1" sx={{ lineHeight: '100%', mb: 0.5 }}>
          +{`${item.coinCount} ${coinData.symbol.toUpperCase()}`}
        </Typography>
      </Box>
    </StyledTableCell>
    <StyledTableCell align="center">
      <Box>
        <TransactionMenu id={item.id} />
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
));

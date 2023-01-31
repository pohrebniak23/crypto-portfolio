import { Box, Typography } from '@mui/material';
import { Coin } from 'entities/Coin';
import { memo } from 'react';
import {
  StyledTableCell,
  StyledTableRow,
} from 'shared/ui/StyledTable/StyledTable';
import { Transactions } from '../../../model/types/TransactionsSchema';
import { TransactionsMenu } from '../TransactionsMenu/TransactionsMenu';

interface TransactionItemProps {
  transactionItem: Transactions;
  coinData: Coin;
}

export const TransactionItem = memo(
  ({ transactionItem, coinData }: TransactionItemProps) =>
    transactionItem &&
    coinData && (
      <StyledTableRow
        key={coinData.name}
        sx={{ border: 'none', backgroundColor: 'unset !important' }}
      >
        <StyledTableCell component="th" scope="row" align="center">
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: '600',
              color:
                transactionItem.type === 'BUY'
                  ? 'rgba(22,163,74,1)'
                  : 'rgba(220,38,38,1)',
            }}
          >
            {transactionItem.type}
          </Typography>
        </StyledTableCell>

        <StyledTableCell
          component="th"
          scope="row"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
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
          <Typography variant="subtitle1">
            {transactionItem.price.toFixed(4)} $
          </Typography>
        </StyledTableCell>

        <StyledTableCell align="center">
          <Box
            sx={{
              color:
                transactionItem.type === 'BUY'
                  ? 'rgba(22,163,74,1)'
                  : 'rgba(220,38,38,1)',
            }}
          >
            {transactionItem.price && (
              <Typography variant="body1" sx={{ lineHeight: '100%', mb: 0.5 }}>
                ${(transactionItem.price * transactionItem.count).toFixed(2)}
              </Typography>
            )}
            <Typography variant="body1" sx={{ lineHeight: '100%', mb: 0.5 }}>
              {transactionItem.type === 'BUY' ? '+' : '-'}
              {`${transactionItem.count} ${coinData.symbol.toUpperCase()}`}
            </Typography>
          </Box>
        </StyledTableCell>

        <StyledTableCell align="center">
          <Box>
            <TransactionsMenu coinId={transactionItem.id} />
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    ),
);
export { };


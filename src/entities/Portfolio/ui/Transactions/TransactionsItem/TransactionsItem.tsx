import { Box, Typography } from '@mui/material';
import { Coin } from 'entities/Coin';
import { memo } from 'react';
import {
  StyledTableCell,
  StyledTableRow,
} from 'shared/ui/StyledTable/StyledTable';
import { Transaction } from '../../../model/types/PortfolioSchema';
import { TransactionsMenu } from '../TransactionsMenu/TransactionsMenu';

interface TransactionItemProps {
  transactionItem: Transaction;
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
        <StyledTableCell
          component="th"
          scope="row"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: '#000', fontWeight: '600', mr: 2 }}
          >
            {transactionItem.type}
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
          <Typography variant="subtitle1">
            {transactionItem.price} $
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center">
          <Box
            sx={{
              color:
                transactionItem.type === 'BUY'
                  ? 'rgba(22,163,74,1)'
                  : 'rgba(220,38,38,1)',
              textAlign: 'right',
              margin: '0 auto',
              width: 'max-content',
            }}
          >
            {transactionItem.price && (
              <Typography variant="body1" sx={{ lineHeight: '100%', mb: 0.5 }}>
                +${transactionItem.price * transactionItem.count}
              </Typography>
            )}
            <Typography variant="body1" sx={{ lineHeight: '100%', mb: 0.5 }}>
              +{`${transactionItem.count} ${coinData.symbol.toUpperCase()}`}
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
export {};

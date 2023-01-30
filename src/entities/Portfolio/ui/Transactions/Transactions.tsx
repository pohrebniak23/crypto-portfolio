import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { PortfolioActions } from 'entities/Portfolio/model/slices/PortfolioSlice';
import { getUserData } from 'entities/User';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/redux';
import { StyledTableCell } from 'shared/ui/StyledTable/StyledTable';
import { coinsAPI } from '../../../../services/CoinsService';
import {
  getPortfolioDataSelector,
  getTransactionsCoin,
  getTransactionsDataSelector,
} from '../../model/selectrors/getPortfolioDataSelector';
import { fetchTransactionsData } from '../../model/services/fetchTransactionsData';
import { Transaction } from '../../model/types/PortfolioSchema';
import { TransactionItem } from './TransactionsItem/TransactionsItem';
import { TransactionsStatistic } from './TransactionsStatistic/TransactionsStatistic';

export const Transactions: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { data: coinsList } = coinsAPI.useFetchAllCoinsQuery('');
  const userData = useSelector(getUserData);
  const coinTicker = useSelector(getTransactionsCoin);

  useEffect(() => {
    if (userData && coinTicker) {
      dispatch(fetchTransactionsData({ userId: userData.id, coinTicker }));
    }
  }, [coinTicker, userData, dispatch]);

  const transactions = useSelector(getTransactionsDataSelector);
  const portfolio = useSelector(getPortfolioDataSelector);
  const coinData = coinsList?.find((item) => item.id === coinTicker);

  const onCloseTransactions = () => {
    dispatch(PortfolioActions.setTransactionsToggle(false));
    dispatch(PortfolioActions.setTransactionsData([]));
  };

  if (!coinData || !transactions || !portfolio) {
    return <Typography>Transactions not found</Typography>;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        pt: 2,
        px: 2,
        backgroundColor: '#fff',
        borderRadius: 3,
        height: 'max-content',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <IconButton onClick={onCloseTransactions}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Transactions
        </Typography>
      </Box>

      <TransactionsStatistic coin={coinData} portfolio={portfolio} />

      <TableContainer component={Box} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ borderBottom: 'unset' }}>
            <TableRow>
              <StyledTableCell
                align="center"
                sx={{ borderRadius: '10px 0 0 10px' }}
              >
                Type
              </StyledTableCell>
              <StyledTableCell align="center">Ticker</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ borderRadius: '0 10px 10px 0' }}
              >
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((transactionItem: Transaction) => (
              <TransactionItem
                key={transactionItem.date}
                transactionItem={transactionItem}
                coinData={coinData}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
});

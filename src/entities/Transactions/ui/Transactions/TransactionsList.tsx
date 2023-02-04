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
import { AssetsData } from 'entities/Assets';
import { coinsAPI } from 'entities/Coin';
import { TransactionsActions } from 'entities/Transactions/model/slices/TransactionsSlice';
import { getUserData } from 'entities/User';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/redux';
import { Loader } from 'shared/ui/Loader/Loader';
import { StyledTableCell } from 'shared/ui/StyledTable/StyledTable';
import {
  getIsTransactionInited,
  getIsTransactionsLoading,
  getTransactionsCoin,
  getTransactionsData,
} from '../../model/selectrors/getTransactionsData';
import { fetchTransactionsData } from '../../model/services/fetchTransactionsData';
import { Transactions } from '../../model/types/TransactionsSchema';
import { TransactionItem } from './TransactionsItem/TransactionsItem';
import { TransactionsStatistic } from './TransactionsStatistic/TransactionsStatistic';

interface TransactionsListProps {
  assets: AssetsData[];
}

export const TransactionsList = React.memo(
  ({ assets }: TransactionsListProps) => {
    const dispatch = useAppDispatch();
    const { data: coinsList } = coinsAPI.useFetchMarketCoinsQuery({});
    const userData = useSelector(getUserData);
    const coinTicker = useSelector(getTransactionsCoin);
    const isTransactionsLoading = useSelector(getIsTransactionsLoading);
    const isTransactionInited = useSelector(getIsTransactionInited);

    useEffect(() => {
      if (userData && coinTicker) {
        dispatch(fetchTransactionsData({ userId: userData.id, coinTicker }));
      }
    }, [coinTicker, userData, dispatch]);

    const transactions = useSelector(getTransactionsData);
    const coinData = coinsList?.find((item) => item.id === coinTicker);

    const onCloseTransactions = () => {
      dispatch(TransactionsActions.setTransactionsToggle(false));
      dispatch(TransactionsActions.setTransactionsData([]));
    };

    if (!coinData || !transactions || !assets) {
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

        <TransactionsStatistic coin={coinData} assets={assets} />

        {isTransactionsLoading && <Loader />}

        {isTransactionInited && transactions.length > 0 && (
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
                {transactions.map((transactionItem: Transactions) => (
                  <TransactionItem
                    key={transactionItem.date}
                    transactionItem={transactionItem}
                    coinData={coinData}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    );
  },
);

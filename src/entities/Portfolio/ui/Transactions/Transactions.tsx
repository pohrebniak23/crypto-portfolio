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
  getTransactionsCoin,
  getTransactionsDataSelector
} from '../../model/selectrors/getPortfolioDataSelector';
import { fetchTransactionsData } from '../../model/services/fetchTransactionsData';
import { Transaction } from '../../model/types/PortfolioSchema';
import { TransactionItem } from './TransactionsItem/TransactionsItem';

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
  const coinData = coinsList?.find((item) => item.id === coinTicker);

  const onCloseTransactions = () => {
    dispatch(PortfolioActions.setTransactionsToggle(false));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        p: 3,
        backgroundColor: '#fff',
        borderRadius: 4,
        height: '100%',
        overflow: 'scroll',
        maxHeight: '100%',
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

      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>
            {`${coinData?.name} (${coinData?.symbol.toUpperCase()}) balance`}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <img
              src={coinData?.image}
              alt=""
              style={{
                width: '40px',
              }}
            />
            <Typography variant="h5" sx={{ ml: 1, fontWeight: '600' }}>
              ${coinData?.current_price}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box sx={{ mr: 4 }}>
            <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>
              Quantity
            </Typography>
            <Typography>{`${
              portfolioData?.coinCount
            } ${coinData?.symbol.toUpperCase()}`}</Typography>
          </Box>
          <Box sx={{ mr: 4 }}>
            <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>
              Avg. buy price
            </Typography>
            <Typography>{portfolioData?.buyPrice}</Typography>
          </Box>
          <Box sx={{ mr: 4 }}>
            <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>
              Total profit / loss
            </Typography>
            <Typography>-50%(-400$)</Typography>
          </Box>
        </Box>
      </Box> */}

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
            {/* {coinTransactions &&
              coinData &&
             } */}
            {transactions &&
              coinData &&
              transactions.map((transactionItem: Transaction) => (
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
export { };


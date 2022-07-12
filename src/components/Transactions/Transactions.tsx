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
import React, { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleTransactions } from '../../redux/reducers/Portfolio/PortfolioSlice';
import { Transaction } from '../../types/Transaction';
import { TransactionLineItem } from './TransactionLineItem';
import { coinsAPI } from '../../services/CoinsService';
import { Coin } from '../../types/Coin';
import { StyledTableCell } from '../Material/StyledTable';
import { Portfolio } from '../../types/Portfolio';

export const Transactions: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { data: coinsList } = coinsAPI.useFetchAllCoinsQuery('');

  const list = useAppSelector((state) => state.portfolio.transactions.list);
  const coin = useAppSelector((state) => state.portfolio.transactions.coin);
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);

  const [coinTransactions, setCoinTransactions] = useState<
    Transaction[] | null
  >(null);
  const [coinData, setCoinData] = useState<Coin | undefined>();
  const [portfolioData, setPortfolioData] = useState<Portfolio | undefined>();

  useEffect(() => {
    if (list) {
      setCoinTransactions(list.filter((item) => item.id === coin));
    }

    if (coinsList) {
      setCoinData(coinsList.find((item) => item.id === coin));
    }

    if (portfolio) {
      setPortfolioData(portfolio.find((item) => item.id === coin));
    }
  }, [list, coinsList, portfolio, coin]);

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
        <IconButton onClick={() => dispatch(toggleTransactions(false))}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Transactions
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
      </Box>

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
            {coinTransactions &&
              coinData &&
              coinTransactions.map((item: Transaction) => (
                <TransactionLineItem
                  key={item.date}
                  item={item}
                  coinData={coinData}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
});

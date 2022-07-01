import { Box, Grid, Paper, Typography } from '@mui/material';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../../components/Loader/Loader';
import { SelectCoin } from '../../components/SelectCoin/SelectCoin';
import { Tabs } from '../../components/Tabs/Tabs';
import { walletSum } from '../../helpers/portfolioInfo';
import { useAppSelector } from '../../hooks/redux';
import './portfolio.sass';
import { PortfolioContent } from './PortfolioContent';
import {
  loadPortfolio,
  loadTransactions,
} from '../../redux/reducers/Portfolio/PortfolioSlice';
import { coinsAPI } from '../../services/CoinsService';

export const Portfolio: React.FC = () => {
  const dispatch = useDispatch();
  const { portfolio } = useAppSelector((state) => state.portfolio);
  const { user } = useAppSelector((state) => state.auth);

  const db = getDatabase();

  const { data: coinsList, isLoading } = coinsAPI.useFetchAllCoinsQuery('', {
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (user) {
      const usersRef = ref(db, `users/${user.id}`);
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          dispatch(loadPortfolio(data.portfolio));
          dispatch(loadTransactions(data.transactions));
        }
      });
    }
  }, [user, db, dispatch]);

  const sum = walletSum(coinsList, portfolio);

  return (
    <div className="finance">
      <Box
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            mr: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Paper
                elevation={3}
                sx={{
                  py: 2,
                  px: 3,
                  width: '100%',
                  borderRadius: 4,
                }}
              >
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Dashboard
                </Typography>
                <Typography variant="subtitle2">
                  An overview of cryptocurrencies and markets
                </Typography>
              </Paper>
            </Grid>

            {isLoading ? (
              <Loader />
            ) : (
              <PortfolioContent sum={sum} portfolio={portfolio} />
            )}
          </Grid>
        </Box>

        <SelectCoin />

        <Paper
          elevation={3}
          sx={{
            py: 2,
            px: 3,
            width: '300px',
            borderRadius: 4,
          }}
        >
          <Tabs />
        </Paper>
      </Box>
    </div>
  );
};

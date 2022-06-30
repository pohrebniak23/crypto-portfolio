import { Box, Paper, Typography } from '@mui/material';
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
import { loadPortfolio } from '../../redux/reducers/Portfolio/PortfolioSlice';
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

        dispatch(loadPortfolio(data.portfolio));
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
          <Paper
            elevation={3}
            sx={{
              py: 2,
              px: 3,
              width: '100%',
              borderRadius: 4,
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              Dashboard
            </Typography>
            <Typography variant="subtitle1">
              An overview of cryptocurrencies and markets
            </Typography>
          </Paper>

          {isLoading ? (
            <Loader />
          ) : (
            <PortfolioContent
              sum={sum}
              portfolio={portfolio}
            />
          )}
        </Box>

        <SelectCoin />

        <div className="finance-sidebar">
          <div className="finance-sidebar__tab">
            <Tabs />
          </div>
        </div>
      </Box>
    </div>
  );
};

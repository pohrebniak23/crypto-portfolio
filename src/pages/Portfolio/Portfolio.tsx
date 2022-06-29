import { Box, Paper, Typography } from '@mui/material';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/Loader/Loader';
import { SelectCoin } from '../../components/SelectCoin/SelectCoin';
import { Tabs } from '../../components/Tabs/Tabs';
import { getCoins } from '../../helpers/portfolio';
import { walletSum } from '../../helpers/portfolioInfo';
import { useInterval } from '../../hooks/useInterval';
import { userData } from '../../redux/reducers/auth/selectors';
import { PortfolioAC } from '../../redux/reducers/portfolio/action-creators';
import { PortfolioData } from '../../redux/reducers/portfolio/selectors';
import { Coin } from '../../types/Coin';
import './portfolio.sass';
import { PortfolioContent } from './PortfolioContent';

export const Portfolio: React.FC = () => {
  const dispatch = useDispatch();
  const portfolio = useSelector(PortfolioData);
  const [coins, setCoins] = useState<Coin[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const db = getDatabase();
  const user = useSelector(userData);

  useEffect(() => {
    if (user) {
      const starCountRef = ref(db, `users/${user.id}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        dispatch(PortfolioAC.loadPortfolio(data.data));
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
    }
  }, [user]);

  useEffect(() => {
    getCoins().then((data: any) => {
      dispatch(PortfolioAC.setCoins(data.data));
      setCoins(data.data);
    });
  }, [dispatch]);

  useInterval(() => {
    getCoins().then((data: any) => {
      dispatch(PortfolioAC.setCoins(data.data));
      setCoins(data.data);
    });
  }, 15000);

  const sum = walletSum(coins, portfolio);

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
            <PortfolioContent sum={sum} portfolio={portfolio} coins={coins} />
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

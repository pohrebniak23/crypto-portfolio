import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PortfolioInfo } from '../../components/PortfolioInfo/PortfolioInfo';
import { PortfolioList } from '../../components/PortfolioList/PortfolioList';
import { SelectCoin } from '../../components/SelectCoin/SelectCoin';
import { Tabs } from '../../components/Tabs/Tabs';
import { getCoins } from '../../helpers/portfolio';
import { walletSum } from '../../helpers/portfolioInfo';
import { useInterval } from '../../hooks/useInterval';
import { PortfolioAC } from '../../redux/reducers/portfolio/action-creators';
import { PortfolioData } from '../../redux/reducers/portfolio/selectors';
import { Coin } from '../../types/Coin';
import './portfolio.sass';

export const Portfolio: React.FC = () => {
  const dispatch = useDispatch();
  const portfolio = useSelector(PortfolioData);
  const [coins, setCoins] = useState<Coin[] | null>(null);

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
            mr: 3
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

          {portfolio.length > 0 ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                display: 'flex',
                mt: 3
              }}
            >
              <PortfolioInfo sum={sum} coins={coins} portfolio={portfolio} />
              <PortfolioList />
            </Box>
          ) : (
            <Typography variant="h5">Your portfolio is empty</Typography>
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

import { Box, Grid, Paper } from '@mui/material';
import { getDatabase, ref, get, child, set } from 'firebase/database';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../../components/Loader/Loader';
import { SelectCoin } from '../../components/SelectCoin/SelectCoin';
import { TabsBlock } from '../../components/Tabs/TabsBlock';
import { walletSum } from '../../helpers/portfolioInfo';
import { useAppSelector } from '../../hooks/redux';
import { PortfolioContent } from './PortfolioContent';
import {
  loadPortfolio,
  loadTransactions,
} from '../../redux/reducers/Portfolio/PortfolioSlice';
import { coinsAPI } from '../../services/CoinsService';
import { PortfolioHead } from '../../components/PortfolioHead/PortfolioHead';

export const Portfolio: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);
  const transactions = useAppSelector((state) => state.portfolio.transactions);

  const { user } = useAppSelector((state) => state.auth);
  const [rightBarOpen, setRightBarOpen] = useState(false);

  const { data: coinsList, isLoading } = coinsAPI.useFetchAllCoinsQuery('', {
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (user) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();

            if (data.portfolio && portfolio.length === 0) {
              dispatch(loadPortfolio(data.portfolio));
            }

            if (data.transactions) {
              dispatch(loadTransactions(data.transactions));
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (user && portfolio.length > 0) {
      const db = getDatabase();

      set(ref(db, `users/${user.id}/portfolio`), { ...portfolio });
      set(ref(db, `users/${user.id}/transactions`), { ...transactions.list });
    }
  }, [portfolio, user, transactions.list]);

  const sum = walletSum(coinsList, portfolio);

  const rightBarHandler = useCallback(() => {
    setRightBarOpen(!rightBarOpen);
  }, [rightBarOpen]);

  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        borderRadius: 3,
        p: 1,
      }}
    >
      <Box
        sx={{
          width: rightBarOpen ? 'calc(100% - 316px)' : '100%',
          transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          sx={{
            overflowY: 'scroll',
            height: 'calc(100vh - 32px)',
            p: 1,
            alignContent: 'flex-start',
            position: 'relative',
          }}
        >
          <PortfolioHead
            rightBarHandler={rightBarHandler}
            isRightBarOpen={rightBarOpen}
          />

          {isLoading ? (
            <Loader />
          ) : (
            <PortfolioContent sum={sum} portfolio={portfolio} />
          )}
        </Grid>
      </Box>

      <SelectCoin />

      <TabsBlock rightBarOpen={rightBarOpen} />
    </Paper>
  );
});

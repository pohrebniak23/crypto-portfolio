import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
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

export const Portfolio: React.FC = () => {
  const dispatch = useDispatch();
  const { portfolio } = useAppSelector((state) => state.portfolio);
  const { user } = useAppSelector((state) => state.auth);
  const [rightBarOpen, setRightBarOpen] = useState(false);

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

  const rightBarHandler = () => {
    setRightBarOpen(!rightBarOpen);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        borderRadius: 3,
        p: 2,
      }}
    >
      <Box
        sx={{
          width: rightBarOpen ? 'calc(100% - 316px)' : '100%',
          transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          display: 'flex',
          flexDirection: 'column',
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
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Dashboard
                </Typography>
                <Typography variant="subtitle2">
                  An overview of cryptocurrencies and markets
                </Typography>
              </Box>
              {!rightBarOpen && (
                <IconButton
                  sx={{
                    width: '40px',
                    height: '40px',
                  }}
                  onClick={rightBarHandler}
                >
                  <MenuIcon />
                </IconButton>
              )}
              {rightBarOpen && (
                <IconButton
                  sx={{
                    width: '40px',
                    height: '40px',
                  }}
                  onClick={rightBarHandler}
                >
                  <CloseIcon />
                </IconButton>
              )}
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

      <Drawer
        open={rightBarOpen}
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            right: '20px',
            height: 'calc(100vh - 32px)',
            top: '16px',
            backgroundColor: 'transparent',
            borderRadius: 4,
            border: 0,
            p: '4px',
          },
        }}
        variant="persistent"
        anchor="right"
      >
        <Paper
          elevation={3}
          sx={{
            py: 2,
            px: 3,
            width: '300px',
            borderRadius: 4,
            height: '100%',
          }}
        >
          <TabsBlock />
        </Paper>
      </Drawer>
    </Paper>
  );
};

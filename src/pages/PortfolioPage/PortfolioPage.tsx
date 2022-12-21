import { Box, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { SelectCoin } from '../../components/SelectCoin/SelectCoin';
import {
  PortfolioContent,
  PortfolioHeader,
  fetchPortfolioData,
} from 'entities/Portfolio';
import { getUserData } from 'entities/User';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/redux';
import { Loader } from '../../components/Loader/Loader';
import { TabsBlock } from '../../components/Tabs/TabsBlock';
import { coinsAPI } from '../../services/CoinsService';

export const PortfolioPage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const userData = useSelector(getUserData);
  const [rightBarOpen, setRightBarOpen] = useState(false);

  const { isLoading } = coinsAPI.useFetchAllCoinsQuery('', {
    pollingInterval: 60000,
  });

  const rightBarHandler = () => {
    setRightBarOpen(!rightBarOpen);
  };

  useEffect(() => {
    if (userData) {
      dispatch(fetchPortfolioData(userData?.id));
    }
    // fetch('https://spectrum-amethyst-fruit.glitch.me/posts', {
    //   method: 'GET',
    //   headers: {
    //     authorization: 'true',
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((res) => console.log(res));
  }, []);

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
          transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: '100%',
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
          <PortfolioHeader
            rightBarHandler={rightBarHandler}
            isRightBarOpen={rightBarOpen}
          />

          {isLoading ? <Loader /> : <PortfolioContent />}
        </Grid>
      </Box>

      {/* <SelectCoin /> */}

      <TabsBlock
        rightBarOpen={rightBarOpen}
        setRightBarOpen={rightBarHandler}
      />
    </Paper>
  );
});

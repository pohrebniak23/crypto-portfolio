import { Box, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { SelectCoin } from '../../components/SelectCoin/SelectCoin';
import { TabsBlock } from '../../components/Tabs/TabsBlock';
import { coinsAPI } from '../../services/CoinsService';
import { PortfolioContent } from './PortfolioContent/PortfolioContent';
import { PortfolioHeader } from './PortfolioHeader/PortfolioHeader';

export const PortfolioPage: React.FC = React.memo(() => {
  const [rightBarOpen, setRightBarOpen] = useState(false);

  const { isLoading } = coinsAPI.useFetchAllCoinsQuery('', {
    pollingInterval: 60000,
  });

  const rightBarHandler = () => {
    setRightBarOpen(!rightBarOpen);
  };

  useEffect(() => {
    fetch('https://spectrum-amethyst-fruit.glitch.me/posts', {
      method: 'GET',
      headers: {
        authorization: 'true',
      },
    })
      .then((resp) => resp.json())
      .then((res) => console.log(res));
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

      <SelectCoin />

      <TabsBlock
        rightBarOpen={rightBarOpen}
        setRightBarOpen={rightBarHandler}
      />
    </Paper>
  );
});

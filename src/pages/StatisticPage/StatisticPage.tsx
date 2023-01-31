import { Box, Grid, Paper } from '@mui/material';
import { fetchAssetsData } from 'entities/Assets';

import { Statistic } from 'entities/Statistic';
import { getUserData } from 'entities/User';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/redux';
import { StatisticHeader } from './AssetsHeader/StatisticHeader';

export const StatisticPage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const userData = useSelector(getUserData);

  useEffect(() => {
    if (userData) {
      dispatch(fetchAssetsData(userData?.id));
    }
  }, [dispatch, userData]);

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
          xl={12}
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
          <StatisticHeader title="Statistic" />

          <Statistic />
        </Grid>
      </Box>
    </Paper>
  );
});

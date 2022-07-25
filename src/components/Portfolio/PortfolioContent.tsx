import { Grid } from '@mui/material';
import React from 'react';
import { Empty } from '../Empty/Empty';
import { InfoPieChart } from '../Info/InfoPieChart';
import { InfoPriceStat } from '../Info/InfoPriceStat';
import { Transactions } from '../Transactions/Transactions';
import { useAppSelector } from '../../hooks/redux';
import { Assets } from '../Assets/Assets';
import { MainInfo } from '../Info/MainInfo';

export const PortfolioContent: React.FC = React.memo(() => {
  const isOpen = useAppSelector((state) => state.portfolio.transactions.isOpen);
  const portfolio = useAppSelector(state => state.portfolio.portfolio);

  return portfolio.length > 0 ? (
    <>
      <Grid
        container
        item
        md={12}
        lg={3}
        xl={3}
        alignContent="start"
        rowSpacing={2}
        columnSpacing={2}
      >
        <Grid item lg={12} xl={12}>
          <MainInfo />
        </Grid>
        <Grid item lg={12} xl={12}>
          <InfoPieChart />
        </Grid>
      </Grid>

      <Grid
        container
        item
        md={12}
        lg={9}
        xl={9}
        rowSpacing={2}
        columnSpacing={2}
      >
        <Grid item lg={12} xl={12}>
          <InfoPriceStat />
        </Grid>
        <Grid item lg={12} xl={12}>
          {!isOpen ? <Assets /> : <Transactions />}
        </Grid>
      </Grid>
    </>
  ) : (
    <Empty text="Your portfolio is empty" />
  );
});

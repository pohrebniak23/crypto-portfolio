import { Grid } from '@mui/material';
import { Assets } from 'components/Assets/Assets';
import { Empty } from 'components/Empty/Empty';
import { InfoPieChart } from 'components/Info/InfoPieChart';
import { InfoPriceStat } from 'components/Info/InfoPriceStat';
import { MainInfo } from 'components/Info/MainInfo';
import { getPortfolioDataSelector } from 'entities/Portfolio/model/selectrors/getPortfolioDataSelector';
import React from 'react';
import { useAppSelector } from 'shared/hooks/redux';

export const PortfolioContent: React.FC = React.memo(() => {
  // const isOpen = useAppSelector((state) => state.portfolio.transactions.isOpen);
  const portfolio = useAppSelector(getPortfolioDataSelector);

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
          <Assets />
          {/* {!isOpen ? : <Transactions />} */}
        </Grid>
      </Grid>
    </>
  ) : (
    <Empty text="Your portfolio is empty" />
  );
});

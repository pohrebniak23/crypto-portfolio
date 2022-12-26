import { Grid } from '@mui/material';
import { Empty } from 'components/Empty/Empty';
import { InfoPieChart } from 'entities/Portfolio/ui/PortfolioInfo/Info/InfoPieChart';
import { InfoPriceStat } from 'entities/Portfolio/ui/PortfolioInfo/PriceStatistic/PriceStatistic';
import { MainInfo } from 'entities/Portfolio/ui/PortfolioInfo/Info/PortfolioInfo';
import { getPortfolioDataSelector } from 'entities/Portfolio/model/selectrors/getPortfolioDataSelector';
import React from 'react';
import { useAppSelector } from 'shared/hooks/redux';
import { PortfolioAssets } from '../PortfolioAssets/PortfolioAssets';

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
          <PortfolioAssets />
          {/* {!isOpen ? : <Transactions />} */}
        </Grid>
      </Grid>
    </>
  ) : (
    <Empty text="Your portfolio is empty" />
  );
});

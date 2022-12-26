import { Grid } from '@mui/material';
import { Empty } from 'components/Empty/Empty';
import { getPortfolioDataSelector } from 'entities/Portfolio/model/selectrors/getPortfolioDataSelector';
import React from 'react';
import { useAppSelector } from 'shared/hooks/redux';
import { PortfolioAssets } from '../PortfolioAssets/PortfolioAssets';
import { PieChartStatistic } from './PieChartSatitstic/PieChartStatistic';
import { PortfolioInfo } from './PortoflioInfo/PortfolioInfo';
import { PriceStatistic } from './PriceStatistic/PriceStatistic';

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
          <PortfolioInfo />
        </Grid>
        <Grid item lg={12} xl={12}>
          <PieChartStatistic />
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
          <PriceStatistic />
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

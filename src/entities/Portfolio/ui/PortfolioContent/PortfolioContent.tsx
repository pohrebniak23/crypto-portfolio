import { Grid } from '@mui/material';
import { memo } from 'react';
import { MessageCenter } from 'shared/ui/MessageCenter/MessageCenter';
import { Portfolio } from '../../model/types/PortfolioSchema';
import { PortfolioAssets } from '../PortfolioAssets/PortfolioAssets';
import { PieChartStatistic } from './PieChartSatitstic/PieChartStatistic';
import { PortfolioInfo } from './PortoflioInfo/PortfolioInfo';
import { PriceStatistic } from './PriceStatistic/PriceStatistic';

interface PortfolioContentProps {
  portfolioData: Portfolio[];
}

export const PortfolioContent = memo(
  ({ portfolioData }: PortfolioContentProps) =>
    portfolioData.length > 0 ? (
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
      <MessageCenter text="Your portfolio is empty" />
    ),
);

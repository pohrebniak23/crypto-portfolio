import { Grid } from '@mui/material';
import { PieChartStatistic } from './PieChartSatistic/PieChartStatistic';
import { PriceStatistic } from './PriceStatistic/PriceStatistic';

export const Statistic = () => (
  <Grid container item xl={12} rowSpacing={2} columnSpacing={2}>
    <Grid item lg={9} xl={9}>
      <PriceStatistic />
    </Grid>
    <Grid item lg={3} xl={3}>
      <PieChartStatistic />
    </Grid>
  </Grid>
);

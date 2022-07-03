import { Grid } from '@mui/material';
import React from 'react';
import { Empty } from '../../components/Empty/Empty';
import { Chart } from '../../components/PortfolioInfo/Chart';
import { PortfolioInfo } from '../../components/PortfolioInfo/PortfolioInfo';
import { PortfolioList } from '../../components/PortfolioList/PortfolioList';
import { Transactions } from '../../components/Transactions/Transactions';
import { useAppSelector } from '../../hooks/redux';
import { Portfolio } from '../../types/Portfolio';

type Props = {
  sum: number;
  portfolio: Portfolio[];
};

export const PortfolioContent: React.FC<Props> = ({ sum, portfolio }) => {
  const { isOpen } = useAppSelector((state) => state.portfolio.transactions);

  return portfolio.length > 0 ? (
    <>
      <Grid container item md={12} lg={12} xl={3} spacing={2} alignContent='start'>
        <Grid item lg={6} xl={12}>
          <PortfolioInfo sum={sum} portfolio={portfolio} />
        </Grid>
        <Grid item lg={6} xl={12}>
          <Chart />
        </Grid>
      </Grid>
      {!isOpen ? <PortfolioList /> : <Transactions />}
    </>
  ) : (
    <Empty text="Your portfolio is empty" />
  );
};

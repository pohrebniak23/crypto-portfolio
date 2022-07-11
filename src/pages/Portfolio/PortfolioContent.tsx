import { Grid } from '@mui/material';
import React from 'react';
import { Empty } from '../../components/Empty/Empty';
import { CurrenciesPieChart } from '../../components/PortfolioInfo/CurrenciesPieChart';
import { PortfolioInfo } from '../../components/PortfolioInfo/PortfolioInfo';
import { PortfolioList } from '../../components/PortfolioList/PortfolioList';
import { PortfolioPriceStat } from '../../components/PortfolioPriceStat/PortfolioPriceStat';
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
      <Grid
        container
        item
        md={12}
        lg={12}
        xl={3}
        alignContent="start"
        rowSpacing={2}
        columnSpacing={2}
      >
        <Grid item lg={6} xl={12}>
          <PortfolioInfo sum={sum} portfolio={portfolio} />
        </Grid>
        <Grid item lg={6} xl={12}>
          <CurrenciesPieChart />
        </Grid>
      </Grid>

      <Grid
        container
        item
        md={12}
        lg={12}
        xl={9}
        rowSpacing={2}
        columnSpacing={2}
      >
        <Grid item lg={12} xl={12}>
          <PortfolioPriceStat />
        </Grid>
        <Grid item lg={12} xl={12}>
          {!isOpen ? <PortfolioList /> : <Transactions />}
        </Grid>
      </Grid>
    </>
  ) : (
    <Empty text="Your portfolio is empty" />
  );
};

import React from 'react';
import { Empty } from '../../components/Empty/Empty';
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
      <PortfolioInfo sum={sum} portfolio={portfolio} />
      {!isOpen ? <PortfolioList /> : <Transactions />}
    </>
  ) : (
    <Empty text="Your portfolio is empty" />
  );
};

import { Box } from '@mui/material';
import React from 'react';
import { Empty } from '../../components/Empty/Empty';
import { PortfolioInfo } from '../../components/PortfolioInfo/PortfolioInfo';
import { PortfolioList } from '../../components/PortfolioList/PortfolioList';
import { Portfolio } from '../../types/Portfolio';

type Props = {
  sum: number;
  portfolio: Portfolio[];
};

export const PortfolioContent: React.FC<Props> = ({ sum, portfolio }) =>
  portfolio.length > 0 ? (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 3,
        display: 'flex',
        mt: 3,
      }}
    >
      <PortfolioInfo sum={sum} portfolio={portfolio} />
      <PortfolioList />
    </Box>
  ) : (
    <Empty text="Your portfolio is empty" />
  );

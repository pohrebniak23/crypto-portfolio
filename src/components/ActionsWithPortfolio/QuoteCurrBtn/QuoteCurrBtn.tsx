import { Button, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { editQuote } from '../../../redux/reducers/Portfolio/PortfolioSlice';
import { Coin } from '../../../types/Coin';

type Props = {
  quoteObj: Coin,
};

export const QuoteCurrBtn: React.FC<Props> = ({ quoteObj }) => {
  const dispatch = useAppDispatch();

  const selectNewCoin = () => {
    dispatch(editQuote(true));
  }
  
  return (
    <Button
      variant="text"
      sx={{ backgroundColor: 'transparent !important' }}
      onClick={() => selectNewCoin()}
    >
      <img
        src={quoteObj.image}
        alt={quoteObj.name}
        className="transaction__image"
        style={{
          width: '30px',
          marginRight: '6px',
        }}
      />
      <Typography variant="body1" sx={{ color: '#000', fontWeight: '600' }}>
        {quoteObj.symbol.toUpperCase()}
      </Typography>
    </Button>
  );
};

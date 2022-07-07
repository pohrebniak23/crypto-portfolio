import { Button, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { editBase } from '../../../redux/reducers/Portfolio/PortfolioSlice';
import { Coin } from '../../../types/Coin';

type Props = {
  baseObj: Coin;
};

export const BaseCurrBtn: React.FC<Props> = ({ baseObj }) => {
  const dispatch = useAppDispatch();

  const selectNewCoin = () => {
    dispatch(editBase(true));
  };

  return (
    <Button
      variant="text"
      sx={{ backgroundColor: 'transparent !important' }}
      onClick={() => selectNewCoin()}
    >
      <img
        src={baseObj.image}
        alt={baseObj.name}
        className="transaction__image"
        style={{
          width: '30px',
          marginRight: '6px',
        }}
      />
      <Typography variant="body1" sx={{ color: '#000', fontWeight: '600' }}>
        {baseObj.symbol.toUpperCase()}
      </Typography>
    </Button>
  );
};

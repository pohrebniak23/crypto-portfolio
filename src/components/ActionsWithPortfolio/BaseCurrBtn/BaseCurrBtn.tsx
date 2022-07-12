import { Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { editBase } from '../../../redux/reducers/Portfolio/PortfolioSlice';
import { Coin } from '../../../types/Coin';

type Props = {
  baseCoin: Coin;
};

export const BaseCurrBtn: React.FC<Props> = React.memo(({ baseCoin }) => {
  const dispatch = useAppDispatch();

  const selectNewCoin = useCallback(() => {
    dispatch(editBase(true));
  }, []);


  console.log('base curr changed')

  return (
    <Button
      variant="text"
      sx={{ backgroundColor: 'transparent !important' }}
      onClick={selectNewCoin}
    >
      <img
        src={baseCoin.image}
        alt={baseCoin.name}
        className="transaction__image"
        style={{
          width: '30px',
          marginRight: '6px',
        }}
      />
      <Typography variant="body1" sx={{ color: '#000', fontWeight: '600' }}>
        {baseCoin.symbol.toUpperCase()}
      </Typography>
    </Button>
  );
});
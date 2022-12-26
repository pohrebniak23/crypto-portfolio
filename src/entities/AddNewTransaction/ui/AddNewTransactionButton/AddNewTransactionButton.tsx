import { Button, Typography } from '@mui/material';
import { Coin } from 'entities/Coin';
import React from 'react';
import { useAppDispatch } from 'shared/hooks/redux';

type Props = {
  coin: Coin;
  coinAction: (value: boolean) => any;
};

export const AddNewTransactionButton: React.FC<Props> = React.memo(
  ({ coin, coinAction }) => {
    const dispatch = useAppDispatch();

    const selectNewCoin = () => {
      dispatch(coinAction(true));
    };

    return (
      <Button
        variant="text"
        sx={{ backgroundColor: 'transparent !important' }}
        onClick={selectNewCoin}
      >
        <img
          src={coin.image}
          alt={coin.name}
          className="transaction__image"
          style={{
            width: '30px',
            marginRight: '6px',
          }}
        />
        <Typography variant="body1" sx={{ color: '#000', fontWeight: '600' }}>
          {coin.symbol.toUpperCase()}
        </Typography>
      </Button>
    );
  },
);

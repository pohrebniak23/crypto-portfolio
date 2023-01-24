import { Button, Typography } from '@mui/material';
import { Coin } from 'entities/Coin';
import React from 'react';

interface AddNewTransactionButtonProps {
  coin: Coin;
}

export const AddNewTransactionButton = React.memo(
  ({ coin }: AddNewTransactionButtonProps) => (
    <Button variant="text" sx={{ backgroundColor: 'transparent !important' }}>
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
  ),
);

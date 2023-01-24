import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Coin } from '../../model/types/CoinSchema';

type CoinItemProps = {
  coin: Coin;
  onSelectItem: (coin: Coin) => void;
};

export const CoinItem = React.memo(({ coin, onSelectItem }: CoinItemProps) => {
  const { name, image, symbol } = coin;

  return (
    coin && (
      <Button
        onClick={() => {
          onSelectItem(coin);
        }}
        variant="outlined"
        sx={{
          border: 'none',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          borderBottom: '1px solid #ddd',
          py: 1.8,
          px: 0,
          pr: 2,
          borderRadius: 0,
          '&:hover': {
            border: 'none',
            background: 'unset',
            borderBottom: '1px solid #000',
          },
        }}
      >
        <img
          style={{ width: '30px', height: 'auto', marginRight: '10px' }}
          src={image}
          alt=""
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant="body2"
            sx={{ lineHeight: '100%', color: '#000', mb: 0.5 }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ lineHeight: '100%', color: '#000', fontSize: '12px' }}
          >
            {symbol}
          </Typography>
        </Box>
        <ArrowForwardIosIcon
          sx={{
            ml: 'auto',
            color: '#000',
            width: '16px',
          }}
        />
      </Button>
    )
  );
});

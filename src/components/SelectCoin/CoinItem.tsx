import { Box, Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Coin } from '../../types/Coin';
import {
  changeBaseCurr,
  changeQuoteCurr,
  editBase,
  editQuote,
} from '../../redux/reducers/Portfolio/PortfolioSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

type Props = {
  coin: Coin;
};

export const CoinItem: React.FC<Props> = React.memo(({ coin }) => {
  const { id, name, image, symbol } = coin;
  const { baseEditing, quoteEditing } = useAppSelector(
    (state) => state.portfolio.selectedCoins,
  );

  const dispatch = useAppDispatch();

  const changeSelected = useCallback(
    (coinId: string) => {
      if (baseEditing) {
        dispatch(changeBaseCurr(coinId));
        dispatch(editBase(false));
      }

      if (quoteEditing) {
        dispatch(changeQuoteCurr(coinId));
        dispatch(editQuote(false));
      }
    },
    [baseEditing, quoteEditing, dispatch],
  );

  return (
    <div>
      {coin && (
        <Button
          onClick={() => {
            changeSelected(id);
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
      )}
    </div>
  );
});

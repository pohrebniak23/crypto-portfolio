import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PortfolioAC } from '../../redux/reducers/portfolio/action-creators';
import {
  BaseEditing,
  QuoteEditing,
} from '../../redux/reducers/portfolio/selectors';
import { Coin } from '../../types/Coin';
import './selectCoin.sass';

type Props = {
  coin: Coin;
};

export const CoinItem: React.FC<Props> = ({ coin }) => {
  const { id, name, image, symbol } = coin;
  const baseEditing = useSelector(BaseEditing);
  const quoteEditing = useSelector(QuoteEditing);

  const dispatch = useDispatch();

  const changeSelected = (coinId: string) => {
    if (baseEditing) {
      dispatch(PortfolioAC.changeBaseCurr(coinId));
      dispatch(PortfolioAC.editingBase(false));
    }

    if (quoteEditing) {
      dispatch(PortfolioAC.changeQuoteCurr(coinId));
      dispatch(PortfolioAC.editingQuote(false));
    }
  };

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
            py: 2,
            px: 0,
            borderRadius: 0,
            '&:hover': {
              border: 'none',
              background: 'unset',
              borderBottom: '1px solid #000',
            }
          }}
        >
          <img
            style={{ width: '40px', height: 'auto', marginRight: '10px' }}
            src={image}
            alt=""
          />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}>
            <Typography variant="body1" sx={{ lineHeight: '100%', color: '#000', mb: 0.5 }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: '100%', color: '#000' }}>
              {symbol}
            </Typography>
          </Box>
          <ArrowForwardIosIcon sx={{
            ml: 'auto',
            color: '#000'
          }} />
        </Button>
      )}
    </div>
  );
};

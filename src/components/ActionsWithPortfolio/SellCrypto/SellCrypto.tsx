import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Switch, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  addTransaction,
  sellCoin,
} from '../../../redux/reducers/Portfolio/PortfolioSlice';
import { Coin } from '../../../types/Coin';
import { coinsAPI } from '../../../services/CoinsService';
import { QuoteCurrBtn } from '../QuoteCurrBtn/QuoteCurrBtn';
import { BaseCurrBtn } from '../BaseCurrBtn/BaseCurrBtn';
import { Loader } from '../../Loader/Loader';

export const SellCrypto: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data: coins } = coinsAPI.useFetchAllCoinsQuery('');
  const { baseCurr, quoteCurr } = useAppSelector(
    (state) => state.portfolio.selectedCoins,
  );

  const [baseCoin, setbaseCoin] = useState<Coin | null>(null);
  const [quoteCoin, setquoteCoin] = useState<Coin | null>(null);

  const [sellCount, setSellCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(1);
  const [isCustomPrice, setIsCustomPrice] = useState<boolean>(false);
  const [customPrice, setCustomPrice] = useState<string>('0');

  useEffect(() => {
    if (coins) {
      const base = coins.find((coin) => coin.id === baseCurr) || null;
      const quote = coins.find((coin) => coin.id === quoteCurr) || null;

      setbaseCoin(base);
      setquoteCoin(quote);
    }
  }, [coins, baseCurr, quoteCurr]);

  useEffect(() => {
    if (baseCoin && quoteCoin) {
      if (isCustomPrice) {
        setPrice(+(sellCount * +customPrice).toFixed(3));
      } else {
        setPrice(+(sellCount * baseCoin.current_price).toFixed(3));
      }
    }
  }, [baseCoin, quoteCoin, sellCount, isCustomPrice, customPrice]);

  const sellCrypto = () => {
    if (baseCoin && quoteCoin) {
      const addedData = {
        id: baseCoin.id,
        sellPrice: !isCustomPrice ? +baseCoin.current_price : +customPrice,
        coinCount: +sellCount,
      };

      dispatch(sellCoin(addedData));
      dispatch(
        addTransaction({
          type: 'SELL',
          date: Date().toLocaleString(),
          ...addedData,
        }),
      );
    }
  };

  return (
    <Box
      sx={{
        pt: 3,
      }}
    >
      {baseCoin && quoteCoin ? (
        <Box>
          {baseCoin && quoteCoin && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#757575',
                  mb: 0.5,
                  textAlign: 'center',
                }}
              >
                {`${baseCoin.name} price`}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#000',
                  fontWeight: '600',
                  textAlign: 'center',
                  pb: '4px',
                  display: !isCustomPrice ? 'block' : 'none',
                }}
              >
                {`$${baseCoin.current_price}`}
              </Typography>
              <Input
                placeholder="0.00"
                sx={{
                  py: 0,
                  borderRadius: 0,
                  fontSize: '24px',
                  lineHeight: '100%',
                  textAlign: 'center',
                  fontWeight: '600',
                  borderBottom: '1px solid #000',
                  display: isCustomPrice ? 'block' : 'none',
                }}
                inputProps={{
                  style: {
                    textAlign: 'center',
                    lineHeight: '100%',
                    paddingTop: 0,
                    paddingBottom: 0,
                  },
                }}
                disableUnderline
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
              />
            </Box>
          )}

<Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
                Quantity
              </Typography>
              <Box
                sx={{
                  backgroundColor: 'rgba(52, 28, 191, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 8px',
                  borderRadius: '10px',
                  mb: 2,
                }}
              >
                <Input
                  placeholder="0.00"
                  sx={{ pl: 0.5 }}
                  disableUnderline
                  value={sellCount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSellCount(+e.target.value)
                  }
                />
                <BaseCurrBtn baseCoin={baseCoin} />
              </Box>
<Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
                Total spent
              </Typography>
              <Box
                sx={{
                  backgroundColor: 'rgba(52, 28, 191, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 8px',
                  borderRadius: '10px',
                  mb: 2,
                }}
              >
                <Input
                  placeholder="0.00"
                  sx={{ pl: 0.5 }}
                  disableUnderline
                  disabled
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                />
                <QuoteCurrBtn quoteCoin={quoteCoin} />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
                  Custom price
                </Typography>
                <Switch
                  checked={isCustomPrice}
                  onChange={() => setIsCustomPrice(!isCustomPrice)}
                />
              </Box>

          <Button
            variant="contained"
            onClick={sellCrypto}
            sx={{
              mt: 1,
              py: 1,
              width: '100%',
            }}
          >
            Add to portfolio
          </Button>
        </Box>
      ) : <Loader />}
    </Box>
  );
};

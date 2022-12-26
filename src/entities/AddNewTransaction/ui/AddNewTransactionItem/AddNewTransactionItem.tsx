import { Box, Button, Input, Switch, Typography } from '@mui/material';
import { AddNewTransactionActions } from 'entities/AddNewTransaction';
import { Coin } from 'entities/Coin';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import {
//   addTransaction,
//   buyCoin,
// } from 'redux/reducers/Portfolio/PortfolioSlice';
import { Loader } from 'components/Loader/Loader';
import { coinsAPI } from 'services/CoinsService';
// import { useAppDispatch } from 'shared/hooks/redux';
import { useAppDispatch } from 'shared/hooks/redux';
import {
  getBaseCoin,
  getBaseCurrencyTicker,
  getQuoteCoin,
  getQuoteCurrencyTicker,
} from '../../model/selectors/getNewTransactionSelector';
import { AddNewTransactionButton } from '../AddNewTransactionButton/AddNewTransactionButton';

export const AddNewTransactionItem: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const { data: coins } = coinsAPI.useFetchAllCoinsQuery('');
  const baseCurrencyTicker = useSelector(getBaseCurrencyTicker);
  const quoteCurrencyTicker = useSelector(getQuoteCurrencyTicker);

  // const [baseCoin, setBaseCoin] = useState<Coin | undefined>(undefined);
  // const [quoteCoin, setQuoteCoin] = useState<Coin | undefined>(undefined);

  const baseCoin = useSelector(getBaseCoin);
  const quoteCoin = useSelector(getQuoteCoin);

  const [buyCount, setBuyCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(1);
  const [isCustomPrice, setIsCustomPrice] = useState<boolean>(false);
  const [customPrice, setCustomPrice] = useState<string>('0');

  useEffect(() => {
    if (coins) {
      console.log(coins);
      const base = coins.find((coin: Coin) => coin.id === baseCurrencyTicker) || undefined;
      const quote =
        coins.find((coin: Coin) => coin.id === quoteCurrencyTicker) || undefined;

      // setBaseCoin(base);
      // setQuoteCoin(quote);

      dispatch(AddNewTransactionActions.setBaseCoin(base))
      dispatch(AddNewTransactionActions.setQuoteCoin(quote))
      // setBaseCoin(base);
      // setQuoteCoin(quote);
    }
  }, [coins, baseCurrencyTicker, quoteCurrencyTicker]);

  useEffect(() => {
    if (baseCoin && quoteCoin) {
      if (isCustomPrice) {
        setPrice(+(buyCount * +customPrice).toFixed(3));
      } else {
        setPrice(+(buyCount * baseCoin.current_price).toFixed(3));
      }
    }
  }, [baseCoin, quoteCoin, buyCount, isCustomPrice, customPrice]);

  const customPriceToggle = () => setIsCustomPrice(!isCustomPrice);

  const addCrypto = () => {
    if (baseCoin && quoteCoin) {
      // const addedData = {
      //   id: baseCoin.id,
      //   buyPrice: !isCustomPrice ? +baseCoin.current_price : +customPrice,
      //   coinCount: +buyCount,
      // };
      // dispatch(buyCoin(addedData));
      // dispatch(
      // addTransaction({
      //   type: 'BUY',
      //   date: Date().toLocaleString(),
      //   ...addedData,
      // }),
      // );
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

          <>
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
                value={buyCount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBuyCount(+e.target.value)
                }
              />
              <AddNewTransactionButton
                coin={baseCoin}
                coinAction={AddNewTransactionActions.setBaseEditing}
              />
            </Box>
          </>

          <>
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
              />
              <AddNewTransactionButton
                coin={quoteCoin}
                coinAction={AddNewTransactionActions.setQuoteEditing}
              />
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
              <Switch checked={isCustomPrice} onChange={customPriceToggle} />
            </Box>
          </>

          <Button
            variant="contained"
            onClick={addCrypto}
            sx={{
              mt: 1,
              py: 1,
              width: '100%',
            }}
          >
            Add to portfolio
          </Button>
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
});

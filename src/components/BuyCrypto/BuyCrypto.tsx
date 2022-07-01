import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { Box, Button, Input, Switch, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  editBase,
  editQuote,
  addToPortfolio,
  addTransaction,
} from '../../redux/reducers/Portfolio/PortfolioSlice';
import { Coin } from '../../types/Coin';
import { coinsAPI } from '../../services/CoinsService';

enum changedCurr {
  BASE = 'BASE',
  QUOTE = 'QUOTE',
}

export const BuyCrypto: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { portfolio, transactions } = useAppSelector((state) => state.portfolio);
  const { data: coins } = coinsAPI.useFetchAllCoinsQuery('');
  const { baseCurr, quoteCurr } = useAppSelector(
    (state) => state.portfolio.selectedCoins,
  );

  const [baseObj, setBaseOjb] = useState<Coin | null>(null);
  const [quoteObj, setQuoteOjb] = useState<Coin | null>(null);
  const [buyCount, setBuyCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(1);
  const [isCustomPrice, setIsCustomPrice] = useState<boolean>(false);
  const [customPrice, setCustomPrice] = useState<string>('0');

  useEffect(() => {
    if (coins) {
      const base = coins.find((coin) => coin.id === baseCurr) || null;
      const quote = coins.find((coin) => coin.id === quoteCurr) || null;

      setBaseOjb(base);
      setQuoteOjb(quote);
    }
  }, [coins, baseCurr, quoteCurr]);

  useEffect(() => {
    if (baseObj && quoteObj) {
      if (customPrice) {
        setPrice(+(buyCount * +customPrice).toFixed(3));
      } else {
        setPrice(+(buyCount * baseObj.current_price).toFixed(3));
      }
    }
  }, [baseObj, quoteObj, buyCount, isCustomPrice, customPrice]);

  useEffect(() => {
    if (user && portfolio.length > 0) {
      const db = getDatabase();

      set(ref(db, `users/${user.id}/portfolio`), { ...portfolio });
      set(ref(db, `users/${user.id}/transactions`), { ...transactions.list });
    }
  }, [portfolio]);

  const selectNewCoin = (changed: changedCurr) => {
    if (changed === changedCurr.BASE) {
      dispatch(editBase(true));
    }

    if (changed === changedCurr.QUOTE) {
      dispatch(editQuote(true));
    }
  };

  const addCrypto = () => {
    if (baseObj && quoteObj) {
      const addedObj = {
        id: baseObj.id,
        buyPrice: !isCustomPrice ? +baseObj.current_price : +customPrice,
        coinCount: +buyCount,
      };

      dispatch(addToPortfolio(addedObj));
      dispatch(addTransaction({
        type: 'BUY',
        date: Date().toLocaleString(),
        ...addedObj
      }))
    }
  };

  return (
    <div className="tabcontent__item">
      {coins && coins.length > 0 && (
        <div className="transaction__block">
          {baseObj && quoteObj && (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              mb: 2,
            }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#757575',
                  mb: 0.5,
                  textAlign: 'center',
                }}
              >
                {`${baseObj.name} price`}
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
                {`$${baseObj.current_price}`}
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
                inputProps={{style: { textAlign: 'center',
                lineHeight: '100%', paddingTop: 0, paddingBottom: 0 }}}
                disableUnderline
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
              />
            </Box>
          )}

          {baseObj && (
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
                  onChange={(e: any) => setBuyCount(e.target.value)}
                />
                <Button
                  variant="text"
                  sx={{ backgroundColor: 'transparent !important' }}
                  onClick={() => selectNewCoin(changedCurr.BASE)}
                >
                  <img
                    src={baseObj.image}
                    alt={baseObj.name}
                    className="transaction__image"
                  />
                  <Typography
                    variant="body1"
                    sx={{ color: '#000', fontWeight: '600' }}
                  >
                    {baseObj.symbol.toUpperCase()}
                  </Typography>
                </Button>
              </Box>
            </>
          )}

          {quoteObj !== null && (
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
                  onChange={(e) => setPrice(+e.target.value)}
                />
                <Button
                  variant="text"
                  sx={{ backgroundColor: 'transparent !important' }}
                  onClick={() => selectNewCoin(changedCurr.QUOTE)}
                >
                  <img
                    src={quoteObj.image}
                    alt={quoteObj.name}
                    className="transaction__image"
                  />
                  <Typography
                    variant="body1"
                    sx={{ color: '#000', fontWeight: '600' }}
                  >
                    {quoteObj.symbol.toUpperCase()}
                  </Typography>
                </Button>
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
            </>
          )}

          <Button
            variant="contained"
            onClick={addCrypto}
            sx={{
              mt: 1,
              py: 1,
            }}
          >
            Add to portfolio
          </Button>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  TextField,
} from '@mui/material';
import { CoinItem } from './CoinItem';
import { useAppSelector } from '../../hooks/redux';
import {
  editBase,
  editQuote,
} from '../../redux/reducers/Portfolio/PortfolioSlice';
import { coinsAPI } from '../../services/CoinsService';

export const SelectCoin: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCoins } = useAppSelector((state) => state.portfolio);
  const { data: coins } = coinsAPI.useFetchAllCoinsQuery('');
  const [search, setSearch] = useState('');
  const [coinsPerPage, setCoinsPerPage] = useState(10);
  const lastCoin = useRef<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const searchHandle = (value: string) => {
    setSearch(value);
  };

  const filteredCoins = useMemo(() => {
    if (coins) {
      return coins
        .slice(0, coinsPerPage)
        .filter((coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()),
        );
    }

    return coins;
  }, [search, coins, coinsPerPage]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const callback = function (entries: any) {
      if (entries[0].isIntersecting) {
        setCoinsPerPage(coinsPerPage + 10);
      }
    };
    observer.current = new IntersectionObserver(callback);
    if (lastCoin.current) {
      observer.current.observe(lastCoin.current);
    }
  }, [lastCoin, coinsPerPage, filteredCoins]);

  const closeSarch = () => {
    dispatch(editBase(false));
    dispatch(editQuote(false));
  };

  return (
    <Dialog
      open={selectedCoins.baseEditing}
      onClose={closeSarch}
      sx={{
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          width: '450px',
          p: 3,
          borderRadius: 8,
        }}
      >
        <Typography variant="h6" sx={{ p: 0, pb: 1, textAlign: 'center' }}>
          Select coin
        </Typography>
        <DialogContent sx={{ p: 0 }}>
          <TextField
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchHandle(e.target.value)}
            id="outlined-basic"
            label="Search"
            variant="standard"
            sx={{
              width: '100%',
              borderRadius: 4,
              pb: 1,
            }}
          />
          <Box
            sx={{
              height: '350px',
            }}
          >
            {filteredCoins &&
              filteredCoins.map((coin) => (
                <CoinItem key={coin.id} coin={coin} />
              ))}
            {filteredCoins && (
              <Box ref={lastCoin} sx={{ height: 2, width: '100%' }} />
            )}
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

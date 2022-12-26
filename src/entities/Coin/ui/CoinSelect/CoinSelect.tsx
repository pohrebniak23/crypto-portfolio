import {
  Box,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Coin } from '../../model/types/CoinSchema';
import { CoinItem } from '../CoinItem/CoinItem';

interface CoinSelectProps {
  coins: Coin[];
  isOpen: boolean;
  onSelectItem: (coin: Coin) => void;
  onCloseHandler: () => void;
}

export const CoinSelect = React.memo(
  ({ isOpen, coins, onSelectItem, onCloseHandler }: CoinSelectProps) => {
    const [search, setSearch] = useState('');
    const lastCoin = useRef<HTMLDivElement | null>(null);

    const searchHandle = (value: string) => {
      setSearch(value);
    };

    const filteredCoins = useMemo(() => {
      if (coins) {
        return coins
          .slice(0, 10)
          .filter((coin: Coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()),
          );
      }

      return coins;
    }, [search, coins]);

    // TO DO - now not working
    // useEffect(() => {
    //   if (observer.current) observer.current.disconnect();

    //   const callback = function (entries: any) {
    //     if (entries[0].isIntersecting) {
    //       setCoinsPerPage(coinsPerPage + 10);
    //     }
    //   };
    //   observer.current = new IntersectionObserver(callback);
    //   if (lastCoin.current) {
    //     observer.current.observe(lastCoin.current);
    //   }
    // }, [lastCoin, coinsPerPage, filteredCoins]);

    // const closeSarch = useCallback(() => {
    //   dispatch(editBase(false));
    //   dispatch(editQuote(false));
    // }, [dispatch]);

    const selectItemHandler = useCallback((coin: Coin) => {
      onSelectItem(coin);
      onCloseHandler();
    }, [onSelectItem, onCloseHandler]);

    return (
      <Dialog
        open={isOpen}
        onClose={onCloseHandler}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                searchHandle(e.target.value)
              }
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
                filteredCoins.map((coin: Coin) => (
                  <CoinItem
                    key={coin.id}
                    coin={coin}
                    onSelectItem={selectItemHandler}
                  />
                ))}
              {filteredCoins && (
                <Box ref={lastCoin} sx={{ height: 2, width: '100%' }} />
              )}
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    );
  },
);

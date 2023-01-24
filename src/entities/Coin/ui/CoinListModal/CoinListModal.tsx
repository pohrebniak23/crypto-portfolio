import { Box, Dialog, DialogTitle, TextField } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Coin } from '../../model/types/CoinSchema';
import { CoinItem } from '../CoinItem/CoinItem';

interface CoinListModalProps {
  coins: Coin[];
  isOpen: boolean;
  onSelectItem: (coin: Coin) => void;
  onCloseHandler: () => void;
  callback: () => void;
}

export const CoinListModal = React.memo(
  ({
    isOpen,
    onSelectItem,
    onCloseHandler,
    coins,
    callback,
  }: CoinListModalProps) => {
    const [search, setSearch] = useState('');

    const searchHandle = (value: string) => {
      setSearch(value);
    };

    const filteredCoins = useMemo(() => {
      if (coins) {
        return coins.filter((coin: Coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()),
        );
      }

      return coins;
    }, [search, coins]);

    const selectItemHandler = useCallback(
      (coin: Coin) => {
        onSelectItem(coin);
        onCloseHandler();
      },
      [onSelectItem, onCloseHandler],
    );

    return (
      <Dialog
        open={isOpen}
        onClose={onCloseHandler}
        PaperProps={{
          sx: {
            borderRadius: 4,
            py: 2,
            px: 3,
            width: '500px',
            height: '610px',
          },
        }}
      >
        <DialogTitle variant="h6" sx={{ p: 0, pb: 1, textAlign: 'center' }}>
          Select coin
        </DialogTitle>
        <TextField
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            searchHandle(e.target.value)
          }
          id="outlined-basic"
          label="Search"
          variant="outlined"
          sx={{
            width: '100%',
            borderRadius: 4,
            pb: 1,
          }}
        />
        <Box
          sx={{
            width: '100%',
            overflowY: 'scroll',
          }}
          id="scrollableDiv"
        >
          <InfiniteScroll
            dataLength={filteredCoins.length}
            next={callback}
            hasMore
            loader={<h4 style={{ textAlign: 'center' }}>Loading.....</h4>}
            scrollableTarget="scrollableDiv"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {filteredCoins.map((coin: Coin) => (
              <CoinItem
                key={coin.id}
                coin={coin}
                onSelectItem={selectItemHandler}
              />
            ))}
          </InfiniteScroll>
          {/* <Box
            sx={{
              height: '350px',
            }}
          >
            
            {filteredCoins && (
              <Box sx={{ height: 2, width: '100%' }} />
            )}
          </Box> */}
        </Box>
      </Dialog>
    );
  },
);

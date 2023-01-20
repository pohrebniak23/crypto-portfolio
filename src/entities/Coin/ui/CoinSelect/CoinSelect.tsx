import { Box, Dialog, DialogTitle, TextField } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Coin } from '../../model/types/CoinSchema';
import { CoinItem } from '../CoinItem/CoinItem';

interface CoinSelectProps {
  coins: Coin[];
  isOpen: boolean;
  onSelectItem: (coin: Coin) => void;
  onCloseHandler: () => void;
  callback: () => void;
}

export const CoinSelect = React.memo(
  ({
    isOpen,
    onSelectItem,
    onCloseHandler,
    coins,
    callback,
  }: CoinSelectProps) => {
    const [search, setSearch] = useState('');
    // const wrapperRef = useRef() as RefObject<HTMLDivElement>;
    // const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    // useInfiniteScroll({
    //   wrapperRef,
    //   triggerRef,
    //   callback,
    // });

    const searchHandle = (value: string) => {
      setSearch(value);
    };

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
        sx={{
          borderRadius: 4,
        }}
      >
        <DialogTitle>
          Select coin
          {/* <Typography variant="h6" sx={{ p: 0, pb: 1, textAlign: 'center' }}>
          </Typography> */}
        </DialogTitle>
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
            width: '450px',
            height: '440px',
            p: 3,
            borderRadius: 8,
            overflowY: 'scroll',
          }}
          // dividers
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

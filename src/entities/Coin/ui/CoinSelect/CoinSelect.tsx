import { Typography } from '@mui/material';
import classNames from 'classnames';
import React, {
  MutableRefObject,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll/useInfiniteScroll';
import { Portal } from 'shared/ui/Portal/Portal';
import { Coin } from '../../model/types/CoinSchema';
import { CoinItem } from '../CoinItem/CoinItem';
import styles from './CoinSelect.module.scss';

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
    const [search, setSearch] = useState('b');
    const wrapperRef = useRef() as RefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
      wrapperRef,
      triggerRef,
      callback,
    });

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
      // <Dialog
      //   open={isOpen}
      //   onClose={onCloseHandler}
      //   sx={{
      //     borderRadius: 4,
      //   }}
      // >

      // </Dialog>
      <Portal>
        <section
          className={classNames(styles.wrap, {
            [styles.open]: isOpen,
          })}
          ref={wrapperRef}
        >
          <div className={styles.block}>
            <Typography variant="h6" sx={{ p: 0, pb: 1, textAlign: 'center' }}>
              Select coin
            </Typography>
            <div className={styles.content}>
              <input
                className={styles.input}
                value={search}
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  searchHandle(e.target.value)
                }
              />
              <div className={styles.block}>
                {filteredCoins.map((coin: Coin) => (
                  <CoinItem
                    key={coin.id}
                    coin={coin}
                    onSelectItem={selectItemHandler}
                  />
                ))}
                <div ref={triggerRef} className={styles.trigger} />
              </div>
            </div>
          </div>
        </section>
      </Portal>
    );
  },
);

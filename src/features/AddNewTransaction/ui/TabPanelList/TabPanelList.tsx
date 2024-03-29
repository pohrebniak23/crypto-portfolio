import { coinsAPI } from 'entities/Coin';
import {
  getBaseCurrencyTicker,
  getQuoteCurrencyTicker,
} from 'features/AddNewTransaction/model/selectors/getNewTransactionSelector';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'shared/ui/Loader/Loader';
import { AddNewTransactionItem } from '../AddNewTransactionItem/AddNewTransactionItem';
import { TabPanelItem } from '../TabPanelItem/TabPanelItem';

interface TabPanelListProps {
  currentTab: number;
}

export const TabPanelList = memo(({ currentTab }: TabPanelListProps) => {
  const { data: coins } = coinsAPI.useFetchMarketCoinsQuery({});
  const baseCurrencyTicker = useSelector(getBaseCurrencyTicker);
  const quoteCurrencyTicker = useSelector(getQuoteCurrencyTicker);

  const baseCoin = useMemo(
    () => coins?.find((item) => item.id === baseCurrencyTicker),
    [baseCurrencyTicker, coins],
  );
  const quoteCoin = useMemo(
    () => coins?.find((item) => item.id === quoteCurrencyTicker),
    [quoteCurrencyTicker, coins],
  );

  return baseCoin && quoteCoin ? (
    <>
      <TabPanelItem value={currentTab} index={0}>
        <AddNewTransactionItem
          transactionType="BUY"
          baseCurrencyCoin={baseCoin}
          quoteCurrencyCoin={quoteCoin}
          buttonText="Buy"
        />
      </TabPanelItem>
      <TabPanelItem value={currentTab} index={1}>
        <AddNewTransactionItem
          transactionType="SELL"
          baseCurrencyCoin={baseCoin}
          quoteCurrencyCoin={quoteCoin}
          buttonText="Sell"
        />
      </TabPanelItem>
    </>
  ) : (
    <Loader />
  );
});

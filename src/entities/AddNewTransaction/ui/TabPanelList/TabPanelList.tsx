import { Loader } from 'components/Loader/Loader';
import {
  getBaseCurrencyTicker,
  getQuoteCurrencyTicker,
} from 'entities/AddNewTransaction/model/selectors/getNewTransactionSelector';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { coinsAPI } from 'services/CoinsService';
import { AddNewTransactionItem } from '../AddNewTransactionItem/AddNewTransactionItem';
import { TabPanelItem } from '../TabPanelItem/TabPanelItem';

interface TabPanelListProps {
  currentTab: number;
}

export const TabPanelList = memo(({ currentTab }: TabPanelListProps) => {
  const { data: coins } = coinsAPI.useFetchAllCoinsQuery('');
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
        />
      </TabPanelItem>
      <TabPanelItem value={currentTab} index={1}>
        <AddNewTransactionItem
          transactionType="SELL"
          baseCurrencyCoin={baseCoin}
          quoteCurrencyCoin={quoteCoin}
        />
      </TabPanelItem>
    </>
  ) : (
    <Loader />
  );
});

import { Box, Grid, Paper } from '@mui/material';
import { Coin, CoinListModal } from 'entities/Coin';
import {
  Assets,
  PortfolioHeader,
  PortfolioInfo,
  Transactions,
  fetchPortfolioData,
  getPortfolioDataInited,
  getPortfolioDataSelector,
} from 'entities/Portfolio';
import { getUserData } from 'entities/User';
import {
  AddNewTransactionActions,
  AddNewTransactionTabs,
  getBaseCurrencyEditing,
  getNewTransactionModalOpen,
  getQuoteCurrencyEditing,
} from 'features/AddNewTransaction';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';

import { getIsTransactionsOpen } from 'entities/Portfolio/model/selectrors/getPortfolioDataSelector';
import { Loader } from 'shared/ui/Loader/Loader';
import { MessageCenter } from 'shared/ui/MessageCenter/MessageCenter';
import { coinsAPI } from '../../services/CoinsService';

export const AssetsPage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const userData = useSelector(getUserData);
  const isOpen = useSelector(getNewTransactionModalOpen);
  const baseEditing = useSelector(getBaseCurrencyEditing);
  const quoteEditing = useSelector(getQuoteCurrencyEditing);
  const portfolioData = useAppSelector(getPortfolioDataSelector);
  const isPortfolioDataInited = useSelector(getPortfolioDataInited);
  const isTransactionsOpen = useSelector(getIsTransactionsOpen);

  const { isLoading } = coinsAPI.useFetchAllCoinsQuery('', {
    pollingInterval: 60000,
  });

  const [perPage, setPerPage] = useState<number>(10);

  const { data: coinsList } = coinsAPI.useGetCurrentPageCoinsQuery(perPage);

  const updatePerPage = () => {
    setPerPage(perPage + 10);
  };

  const rightBarHandler = () => {
    dispatch(AddNewTransactionActions.toggleModal());
  };

  const onSelectCoin = (coin: Coin) => {
    if (baseEditing) {
      dispatch(AddNewTransactionActions.setBaseTicker(coin.id));
    }

    if (quoteEditing) {
      dispatch(AddNewTransactionActions.setQuoteTicker(coin.id));
    }
  };

  const onCloseCoinSelect = () => {
    dispatch(AddNewTransactionActions.setBaseEditing(false));
    dispatch(AddNewTransactionActions.setQuoteEditing(false));
  };

  useEffect(() => {
    if (userData) {
      console.log(userData)
      dispatch(fetchPortfolioData(userData?.id));
    }
  }, [dispatch, userData]);

  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        borderRadius: 3,
        p: 1,
      }}
    >
      <Box
        sx={{
          transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          sx={{
            overflowY: 'scroll',
            height: 'calc(100vh - 32px)',
            p: 1,
            alignContent: 'flex-start',
            position: 'relative',
          }}
        >
          <PortfolioHeader
            title="Dashboard"
            subtitle="An overview of cryptocurrencies and markets"
            rightBarHandler={rightBarHandler}
            isRightBarOpen={isOpen}
          />

          {isLoading && !isPortfolioDataInited && <Loader />}

          {portfolioData &&
            isPortfolioDataInited &&
            (portfolioData.length > 0 ? (
              <>
                <Grid
                  container
                  item
                  md={12}
                  lg={12}
                  xl={12}
                  alignContent="start"
                  rowSpacing={2}
                  columnSpacing={2}
                >
                  <Grid item xl={12} sm={12}>
                    <PortfolioInfo />
                  </Grid>
                </Grid>

                <Grid item xl={12} sm={12}>
                  {!isTransactionsOpen ? (
                    <Assets portfolio={portfolioData} />
                  ) : (
                    <Transactions />
                  )}
                </Grid>
              </>
            ) : (
              <MessageCenter text="Your portfolio is empty" />
            ))}
        </Grid>
      </Box>

      {coinsList && (
        <CoinListModal
          callback={updatePerPage}
          coins={coinsList}
          isOpen={baseEditing || quoteEditing}
          onSelectItem={onSelectCoin}
          onCloseHandler={onCloseCoinSelect}
        />
      )}

      <AddNewTransactionTabs
        rightBarOpen={isOpen}
        setRightBarOpen={rightBarHandler}
      />
    </Paper>
  );
});

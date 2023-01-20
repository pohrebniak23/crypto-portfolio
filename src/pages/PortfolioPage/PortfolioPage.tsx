import { Box, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  AddNewTransactionActions,
  AddNewTransactionTabs,
  getNewTransactionModalOpen,
} from 'entities/AddNewTransaction';
import { Coin, CoinSelect } from 'entities/Coin';
import {
  PortfolioContent,
  PortfolioHeader,
  fetchPortfolioData,
  getPortfolioDataSelector,
} from 'entities/Portfolio';
import { getUserData } from 'entities/User';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { Loader } from '../../shared/ui/Loader/Loader';
import {
  getBaseCurrencyEditing,
  getQuoteCurrencyEditing,
} from '../../entities/AddNewTransaction/model/selectors/getNewTransactionSelector';
import { coinsAPI } from '../../services/CoinsService';
import { getPortfolioDataInited } from '../../entities/Portfolio/model/selectrors/getPortfolioDataSelector';

export const PortfolioPage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const userData = useSelector(getUserData);
  const isOpen = useSelector(getNewTransactionModalOpen);
  const baseEditing = useSelector(getBaseCurrencyEditing);
  const quoteEditing = useSelector(getQuoteCurrencyEditing);
  const portfolioData = useAppSelector(getPortfolioDataSelector);
  const isPortfolioDataInited = useSelector(getPortfolioDataInited);

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
            rightBarHandler={rightBarHandler}
            isRightBarOpen={isOpen}
          />

          {isLoading && !isPortfolioDataInited && <Loader />}

          {portfolioData && isPortfolioDataInited && <PortfolioContent portfolioData={portfolioData} />}
        </Grid>
      </Box>

      {coinsList && (
        <CoinSelect
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

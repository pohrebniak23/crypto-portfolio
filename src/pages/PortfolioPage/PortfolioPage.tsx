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
} from 'entities/Portfolio';
import { getUserData } from 'entities/User';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/redux';
import { Loader } from '../../components/Loader/Loader';
import {
  getBaseCurrencyEditing,
  getQuoteCurrencyEditing,
} from '../../entities/AddNewTransaction/model/selectors/getNewTransactionSelector';
import { coinsAPI } from '../../services/CoinsService';

export const PortfolioPage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const userData = useSelector(getUserData);
  const isOpen = useSelector(getNewTransactionModalOpen);
  const baseEditing = useSelector(getBaseCurrencyEditing);
  const quoteEditing = useSelector(getQuoteCurrencyEditing);

  const { isLoading } = coinsAPI.useFetchAllCoinsQuery('', {
    pollingInterval: 60000,
  });

  const [perPage, setPerPage] = useState<number>(10);

  const { data: coinSelect } = coinsAPI.useGetCurrentPageCoinsQuery(perPage);

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
    // fetch('https://spectrum-amethyst-fruit.glitch.me/posts', {
    //   method: 'GET',
    //   headers: {
    //     authorization: 'true',
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((res) => console.log(res));
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

          {isLoading ? <Loader /> : <PortfolioContent />}
        </Grid>
      </Box>

      {coinSelect && (
        <CoinSelect
          callback={updatePerPage}
          coins={coinSelect}
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

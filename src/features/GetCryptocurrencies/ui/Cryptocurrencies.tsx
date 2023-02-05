import { Paper, Typography } from '@mui/material';
import { coinsAPI } from 'entities/Coin';
import { useState } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { CryptocurrenciesList } from './CryptocurrenciesList/CryptocurrenciesList';

export const Cryptocurrencies = () => {
  const [perPage, setPerPage] = useState<number>(50);

  const {
    isLoading,
    data: cryptocurrencies,
    isFetching,
  } = coinsAPI.useFetchMarketCoinsQuery({
    perPage,
    sparkline: 'true',
    interval: '24h',
  });

  const setNewPage = () => {
    setPerPage((currentPage) => currentPage + 50);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        py: 2,
        px: 2,
        backgroundColor: '#fff',
        borderRadius: 3,
        height: 'auto',
        mb: 4,
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Cryptocurrencies
      </Typography>

      {isLoading && <Loader />}

      {cryptocurrencies && (
        <CryptocurrenciesList
          cryptocurrencies={cryptocurrencies}
          infiniteScrollCallback={setNewPage}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
    </Paper>
  );
};

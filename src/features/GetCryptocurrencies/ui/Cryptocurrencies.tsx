import ReplayIcon from '@mui/icons-material/Replay';
import { Box, Button, Paper, Typography } from '@mui/material';
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
    error,
    refetch,
  } = coinsAPI.useFetchMarketCoinsQuery({
    perPage,
    sparkline: 'true',
    interval: '24h',
  });

  const setNewPage = () => {
    setPerPage((currentPage) => currentPage + 50);
  };

  const resetPage = () => {
    setPerPage(50);
    refetch();
  }

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

      {cryptocurrencies && !error && (
        <CryptocurrenciesList
          cryptocurrencies={cryptocurrencies}
          infiniteScrollCallback={setNewPage}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}

      {error && (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h6" my={2}>
            Something went wrong, please reload page
          </Typography>
          <Button
            onClick={resetPage}
            variant="contained"
            sx={{ marginBottom: '10px' }}
          >
            <ReplayIcon sx={{ marginRight: '6px' }} />
            Reload
          </Button>
        </Box>
      )}
    </Paper>
  );
};

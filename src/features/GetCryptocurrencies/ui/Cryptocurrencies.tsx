import { Paper, Typography } from '@mui/material';
import { coinsAPI } from 'entities/Coin';
import { Loader } from 'shared/ui/Loader/Loader';
import { CryptocurrenciesList } from './CryptocurrenciesList/CryptocurrenciesList';

export const Cryptocurrencies = () => {
  const { isLoading, data: cryptocurrencies } =
    coinsAPI.useFetchMarketCoinsQuery({ perPage: '100', sparkline: 'true', interval: '24h' });

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
        mb: 4
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Cryptocurrencies
      </Typography>

      {isLoading && <Loader />}

      {cryptocurrencies && (
        <CryptocurrenciesList cryptocurrencies={cryptocurrencies} />
      )}
    </Paper>
  );
};

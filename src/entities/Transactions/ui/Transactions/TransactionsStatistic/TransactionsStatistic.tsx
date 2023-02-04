import { Box, Typography } from '@mui/material';
import { AssetsData } from 'entities/Assets';
import { Coin } from 'entities/Coin';

interface TransactionStatisticProps {
  coin: Coin;
  assets: AssetsData[];
}

export const TransactionsStatistic = ({
  coin,
  assets,
}: TransactionStatisticProps) => {
  const portfolioCount =
    assets.find((item) => item.ticker === coin.id)?.count || 0;
  const avgBuyPrice =
    assets.find((item) => item.ticker === coin.id)?.avgBuyPrice || 0;
  const marketPriceSum = portfolioCount * coin.current_price;
  const buySum = portfolioCount * avgBuyPrice;

  const profitLoss = () => {
    const profit = marketPriceSum - buySum;
    const profitPercent = (profit / marketPriceSum) * 100;

    if (portfolioCount === 0) {
      return <Typography color="rgba(22,163,74,1)">$0 (0%)</Typography>;
    }

    if (profit > 0) {
      return (
        <Typography color="rgba(22,163,74,1)">
          {profitPercent.toFixed(2)}% (+${Math.abs(profit).toFixed(2)})
        </Typography>
      );
    }

    if (profit === 0) {
      return (
        <Typography color="#757575">
          {profitPercent.toFixed(2)}% (${Math.abs(profit).toFixed(2)})
        </Typography>
      );
    }

    return (
      <Typography color="rgba(220,38,38,1)">
        {profitPercent.toFixed(2)}% (-${Math.abs(profit).toFixed(2)})
      </Typography>
    );
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: 2 }}>
      <Box>
        <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>
          {`${coin?.name} (${coin?.symbol.toUpperCase()}) balance`}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <img
            src={coin?.image}
            alt=""
            style={{
              width: '40px',
            }}
          />
          <Typography variant="h5" sx={{ ml: 1, fontWeight: '600' }}>
            ${coin?.current_price}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ mr: 6, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>
            Quantity
          </Typography>
          <Typography align="center">{portfolioCount} coins</Typography>
        </Box>
        <Box sx={{ mr: 6 }}>
          <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>
            Avg. buy price
          </Typography>
          <Typography align="center">${avgBuyPrice.toFixed(4)}</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', mr: 2 }}>
          <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>
            Total profit / loss
          </Typography>
          {profitLoss()}
        </Box>
      </Box>
    </Box>
  );
};

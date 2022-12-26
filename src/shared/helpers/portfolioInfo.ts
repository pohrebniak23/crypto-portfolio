import { Portfolio } from 'entities/Portfolio';
import { Coin } from 'entities/Coin';

export const walletSum = (
  coins: Coin[] | undefined,
  portfolio: Portfolio[],
) => {
  if (coins) {
    return portfolio.reduce((prev, current) => {
      const item = coins.find((finded) => finded.id === current.id) || null;

      if (item) {
        return prev + item.current_price * current.count;
      }

      return prev;
    }, 0);
  }

  return 0;
};

export const allTimeProfit = (
  coins: Coin[] | undefined,
  portfolio: Portfolio[],
) => {
  if (coins) {
    return portfolio.reduce((prev, current) => {
      const item = coins.find((coinItem: Coin) => coinItem.id === current.ticker) || null;
      console.log(item)
      if (item) {
        return (
          prev +
          item.current_price * current.count -
          current.avgBuyPrice * current.count
        );
      }

      return prev;
    }, 0);
  }

  return null;
};

export interface TopGainerLooser {
  coin: Coin;
  profit: number;
  percent: number;
}

export interface TopGainerLooserProps {
  coins: Coin[] | undefined;
  portfolio: Portfolio[];
  type: 'gainer' | 'looser';
}

export const topGainerLooser = ({
  coins,
  portfolio,
  type,
}: TopGainerLooserProps) => {
  let gainer = 0;
  let result: TopGainerLooser | null = null;

  if (coins) {
    portfolio.forEach((portfolioItem) => {
      const portfolioCoin = coins.find(
        (coinItem) => coinItem.id === portfolioItem.id,
      );

      if (portfolioCoin) {
        const profit =
          portfolioCoin.current_price * portfolioItem.count -
          portfolioItem.avgBuyPrice * portfolioItem.count;
        const percent =
          (profit / (portfolioItem.avgBuyPrice * portfolioItem.count)) * 100;

        if (type === 'gainer' && profit > gainer) {
          gainer = profit;

          result = {
            coin: portfolioCoin,
            profit,
            percent,
          };
        }
        
        if (type === 'looser' && profit < gainer) {
          gainer = profit;

          result = {
            coin: portfolioCoin,
            profit,
            percent,
          };
        }
      }
    });
  }

  return result;
};

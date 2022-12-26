import { Portfolio } from 'entities/Portfolio';
import { Coin } from 'entities/Coin';

export const walletSum = (
  coins: Coin[] | null | undefined,
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
  coins: Coin[] | null | undefined,
  portfolio: Portfolio[],
) => {
  if (coins) {
    return portfolio.reduce((prev, current) => {
      const item = coins.find((finded) => finded.id === current.id) || null;
      if (item) {
        return (
          prev +
          item.current_price * current.count -
          current.buyPrice * current.count
        );
      }

      return prev;
    }, 0);
  }

  return 0;
};

export type GainerLooser = {
  coin: Coin;
  profit: number;
  percent: number;
};

export const topGainerLooser = (
  coins: Coin[] | null | undefined,
  portfolio: Portfolio[],
  type: 'gainer' | 'looser',
): GainerLooser | null => {
  let gainer = 0;
  let result: GainerLooser | null = null;

  if (coins) {
    portfolio.forEach((current) => {
      const item = coins.find((finded) => finded.id === current.id) || null;
      if (item) {
        const profit =
          item.current_price * current.count - current.buyPrice * current.count;
        const percent = (profit / (current.buyPrice * current.count)) * 100;

        if (type === 'gainer') {
          if (profit > gainer) {
            gainer = profit;
            result = {
              coin: item,
              profit,
              percent,
            };
          }
        } else if (type === 'looser') {
          if (profit < gainer) {
            gainer = profit;
            result = {
              coin: item,
              profit,
              percent,
            };
          }
        }
      }
    });
  }

  return result;
};

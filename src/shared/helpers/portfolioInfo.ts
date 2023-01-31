import { AssetsData } from 'entities/Assets';
import { Coin } from 'entities/Coin';

export const walletSum = (coins: Coin[] | undefined, assets: AssetsData[]) => {
  if (coins) {
    return assets.reduce((prev, current) => {
      const item = coins.find((finded) => finded.id === current.ticker) || null;

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
  assets: AssetsData[],
) => {
  if (coins) {
    return assets.reduce((prev, current) => {
      const item =
        coins.find((coinItem: Coin) => coinItem.id === current.ticker) || null;
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
  assets: AssetsData[];
  type: 'gainer' | 'looser';
}

export const topGainerLooser = ({
  coins,
  assets,
  type,
}: TopGainerLooserProps) => {
  let gainer = 0;
  let result: TopGainerLooser | null = null;

  if (coins) {
    assets.forEach((assetsItem) => {
      const portfolioCoin = coins.find(
        (coinItem) => coinItem.id === assetsItem.ticker,
      );

      if (portfolioCoin) {
        const profit =
          portfolioCoin.current_price * assetsItem.count -
          assetsItem.avgBuyPrice * assetsItem.count;
        const percent =
          (profit / (assetsItem.avgBuyPrice * assetsItem.count)) * 100;

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

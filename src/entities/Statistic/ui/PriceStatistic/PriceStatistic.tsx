import { Paper } from '@mui/material';
import { getAssetsData } from 'entities/Assets';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAppSelector } from 'shared/hooks/redux';

interface StatData {
  date: string;
  price: number;
}

export const PriceStatistic: React.FC = React.memo(() => {
  const assets = useAppSelector(getAssetsData);
  const [statData, setStatData] = useState<StatData[] | null>(null);

  const getHistory = useCallback(async () => {
    const promises = assets.map((item) =>
      fetch(
        `https://api.coingecko.com/api/v3/coins/${item.ticker}/market_chart?vs_currency=usd&days=7&interval=daily`,
      )
        .then((resp) => resp.json())
        .then((data) => {
          const coinHistory = data.prices.map((historyPrices: number[]) => ({
            date: historyPrices[0],
            price: historyPrices[1] * item.count,
          }));

          return coinHistory;
        }),
    );

    const result = await Promise.all(promises);

    return result;
  }, [assets]);

  useEffect(() => {
    getHistory().then((data) => {
      const allPrices = [].concat(...data);
      const shortPrices = allPrices.slice(0, 7);

      if (allPrices.length > 0) {
        const resultStat: StatData[] = shortPrices.map(
          (shortItem: StatData) => {
            const sum: StatData = {
              date: shortItem.date,
              price: 0,
            };

            allPrices.forEach((allItem: StatData) => {
              if (allItem.date === shortItem.date) {
                const dates = new Date(allItem.date);
                sum.date = `${dates.getDate()}/${
                  dates.getMonth() + 1
                }/${dates.getFullYear()}`;
                sum.price += allItem.price;
              }
            });

            return sum;
          },
        );

        setStatData(resultStat);
      }
    });
  }, [assets, getHistory]);

  const getMaxRenge = () => {
    let max = 0;

    if (statData && statData.length > 0) {
      statData.forEach((item: StatData) => {
        if (item.price > max) {
          max = +item.price;
        }
      });
    }

    return +(max + (max / 100) * 5).toFixed();
  };

  const getMinRenge = () => {
    if (statData && statData.length > 0) {
      let min = statData[0].price;

      statData.forEach((item: StatData) => {
        if (item.price < min) {
          min = +item.price;
        }
      });

      return +(min - (min / 100) * 5).toFixed();
    }

    return 0;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: '#fff',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '322px',
      }}
    >
      {statData && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={300}
            data={statData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" dy={10} fontSize={14} />
            <YAxis
              domain={[getMinRenge(), getMaxRenge()]}
              dx={-5}
              fontSize={14}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
});

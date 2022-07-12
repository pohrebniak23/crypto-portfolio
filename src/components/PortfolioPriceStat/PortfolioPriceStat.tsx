import React, { useCallback, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAppSelector } from '../../hooks/redux';

interface StatData {
  date: string;
  price: number;
}

export const PortfolioPriceStat: React.FC = React.memo(() => {
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);
  const [statData, setStatData] = useState<StatData[] | null>(null);

  const getHistory = async () => {
    console.log('stat render')
    const promises = portfolio.map((item) =>
      fetch(
        `https://api.coingecko.com/api/v3/coins/${item.id}/market_chart?vs_currency=usd&days=7&interval=daily`,
      )
        .then((resp) => resp.json())
        .then((data) => {
          const coinHistory = data.prices.map((historyPrices: number[]) => ({
            date: historyPrices[0],
            price: historyPrices[1] * item.coinCount,
          }));

          return coinHistory;
        }),
    );

    const result = await Promise.all(promises);

    return result;
  };

  useEffect(() => {
    console.log('stat render')
    getHistory().then((data) => {
      const allPrices = [].concat(...data);
      const shortPrices = allPrices.slice(0, 7);

      if (allPrices.length > 0) {
        const resultStat: StatData[] = shortPrices.map((shortItem: StatData) => {
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
        });

        setStatData(resultStat);
      }
    });
  }, [portfolio]);

  const getMaxRenge = useCallback(() => {
    console.log('stat render')
    let max = 0;

    if (statData && statData.length > 0) {
      statData.forEach((item: StatData) => {
        if (item.price > max) {
          max = +item.price;
        }
      });
    }

    return +(max + (max / 100) * 5).toFixed();
  }, []);

  const getMinRenge = useCallback(() => {
    console.log('stat render')
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
  }, []);

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
        height: '376px',
      }}
    >
      {statData && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={statData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" dy={10} />
            <YAxis domain={[getMinRenge(), getMaxRenge()]} dx={-5} />
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
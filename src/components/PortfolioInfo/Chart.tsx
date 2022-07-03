import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Paper } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart: React.FC = () => {
  const { portfolio } = useAppSelector((state) => state.portfolio);

  const sum: number[] = portfolio.map((item) => item.buyPrice * item.coinCount);
  const names: string[] = portfolio.map((item) => item.id);

  const data = {
    labels: names,
    datasets: [
      {
        label: '# of Votes',
        data: sum,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
        borderRadius: 10,
        hoverOffset: 5,
        clip: 10,
      },
    ],
  };

  return (
    <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: '#fff',
          borderRadius: 4,
          height: 'max-content',
        }}
      >
      <Doughnut
        style={{
          maxHeight: '100%',
          height: 'auto !important',
          width: 'auto !important',
          margin: '0 auto',
        }}
        data={data}
      />
    </Paper>
  );
};

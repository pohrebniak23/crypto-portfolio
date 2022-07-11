import React from 'react';
import { Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppSelector } from '../../hooks/redux';

interface PieData {
  name: string;
  value: number;
}

export const CurrenciesPieChart: React.FC = () => {
  const { portfolio } = useAppSelector((state) => state.portfolio);
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieData: PieData[] = portfolio.map((item) => ({
    name: item.id,
    value: +(item.buyPrice * item.coinCount).toFixed(0),
  }));

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: '#fff',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        height: '376px',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={228} height={228}>
          <Pie
            dataKey="value"
            data={pieData}
            innerRadius={80}
            outerRadius={134}
            paddingAngle={3}
          >
            {pieData.map((entry: PieData, index: number) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={colors[index % colors.length]}
                cursor="pointer"
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

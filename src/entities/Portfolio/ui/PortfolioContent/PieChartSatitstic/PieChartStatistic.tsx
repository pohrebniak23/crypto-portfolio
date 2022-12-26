import { Paper } from '@mui/material';
import { getPortfolioDataSelector } from 'entities/Portfolio';
import React, { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppSelector } from 'shared/hooks/redux';

interface PieChartData {
  name: string;
  value: number;
}

export const PieChartStatistic = React.memo(() => {
  const portfolio = useAppSelector(getPortfolioDataSelector);
  const colors = useMemo(
    () => ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    [],
  );

  const pieData = useMemo(
    () =>
      portfolio.map((item) => ({
        name: item.id,
        value: +(item.avgBuyPrice * item.count).toFixed(0),
      })),
    [portfolio],
  );

  const pieCells = useMemo(
    () =>
      pieData.map((entry: PieChartData, index: number) => (
        <Cell
          key={`cell-${entry.name}`}
          fill={colors[index % colors.length]}
          cursor="pointer"
        />
      )),
    [pieData, colors],
  );

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
            {pieCells}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
});

import { Paper } from '@mui/material';
import { getAssetsData } from 'entities/Assets';
import React, { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppSelector } from 'shared/hooks/redux';

interface PieChartData {
  name: string;
  value: number;
}

export const PieChartStatistic = React.memo(() => {
  const portfolio = useAppSelector(getAssetsData);
  const colors = useMemo(
    () => ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    [],
  );

  const pieData = useMemo(
    () =>
      portfolio.map((item) => ({
        name: item.ticker,
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
        height: '322px',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={120} height={120}>
          <Pie
            dataKey="value"
            data={pieData}
            innerRadius={50}
            outerRadius={74}
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

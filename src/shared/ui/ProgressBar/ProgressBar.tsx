import { Box } from '@mui/material';

interface ProgressBarProps {
  height: string;
  bgColor: string;
  percentColor: string;
  value: number;
  maxValue: number;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { value, maxValue, height, bgColor, percentColor } = props;
  const percentage = (value / maxValue) * 100;

  return (
    <Box
      sx={{
        width: '100%',
        height,
        background: bgColor,
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          width: `${percentage}%`,
          background: percentColor,
          height,
          position: 'relative',
          borderRadius: '10px',
        }}
      />
    </Box>
  );
};

import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
  position?: string;
  left?: string;
  top?: string;
}

export const Loader = (props: LoaderProps) => {
  const { position = 'absolute', left = '50%', top = '50%' } = props;

  return (
    <Box
      sx={{
        position,
        left,
        top,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

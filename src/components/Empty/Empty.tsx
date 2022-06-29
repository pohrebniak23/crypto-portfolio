import { Typography } from '@mui/material';
import React from 'react';

type Props = {
  text: string;
};

export const Empty: React.FC<Props> = ({ text }) => (
  <Typography
    variant="h5"
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    {text}
  </Typography>
);

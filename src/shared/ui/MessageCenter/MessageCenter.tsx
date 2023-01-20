import { Typography } from '@mui/material';

interface MessageCenterProps {
  text: string;
}

export const MessageCenter = ({ text }: MessageCenterProps) => (
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

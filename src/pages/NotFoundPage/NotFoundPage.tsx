import { Paper } from '@mui/material';
import { MessageCenter } from 'shared/ui/MessageCenter/MessageCenter';

export const NotFoundPage = () => (
  <Paper
    sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      borderRadius: 3,
    }}
  >
    <MessageCenter text="Page is not found" />
  </Paper>
);

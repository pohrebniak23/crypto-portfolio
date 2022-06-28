import { Box, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../redux/reducers/auth/selectors'

export const Home: React.FC = () => {
  const user = useSelector(userData);
  return (
    <Box sx={{
      width: '100%',
      backgroundColor: 'secondary.main',
      height: 'calc(100vh - 32px)',
      borderRadius: 7,
      padding: 2,
      margin: 2,
      ml: 0,
    }}>
      {user !== null && (
        <Typography variant="h4">
          Hi {user.username}
        </Typography>
      )}
    </Box>
  );
};


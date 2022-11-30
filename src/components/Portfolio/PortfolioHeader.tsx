import React from 'react';
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

type Props = {
  rightBarHandler: () => void,
  isRightBarOpen: boolean
}

export const PortfolioHeader: React.FC<Props> = React.memo(({ rightBarHandler, isRightBarOpen }) => (
  <Grid item sm={12}>
    <Paper
      elevation={3}
      sx={{
        py: 2,
        px: 3,
        width: '100%',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="subtitle2">
          An overview of cryptocurrencies and markets
        </Typography>
      </Box>

      {!isRightBarOpen && (
        <IconButton
          sx={{
            width: '40px',
            height: '40px',
          }}
          onClick={rightBarHandler}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Paper>
  </Grid>
));
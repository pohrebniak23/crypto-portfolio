import MenuIcon from '@mui/icons-material/Menu';
import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import { memo } from 'react';

interface AssetsHeaderProps {
  title: string;
  subtitle?: string;
  rightBarHandler?: () => void;
  isRightBarOpen?: boolean;
}

export const AssetsHeader = memo(
  ({ title, subtitle, rightBarHandler, isRightBarOpen }: AssetsHeaderProps) => (
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
          <Typography variant="h5">{title}</Typography>

          {subtitle && (
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {rightBarHandler && !isRightBarOpen && (
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
  ),
);

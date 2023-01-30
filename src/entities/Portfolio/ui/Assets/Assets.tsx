import { Paper, Typography } from '@mui/material';
import { Portfolio } from '../../model/types/PortfolioSchema';
import { AssetsList } from './AssetsList/AssetsList';

interface AssetsProps {
  portfolio: Portfolio[];
}

export const Assets = ({ portfolio }: AssetsProps) => (
  <Paper
    elevation={3}
    sx={{
      width: '100%',
      py: 2,
      px: 2,
      backgroundColor: '#fff',
      borderRadius: 3,
      height: 'max-content',
    }}
  >
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      Assets
    </Typography>

    <AssetsList portfolioList={portfolio} />
  </Paper>
);

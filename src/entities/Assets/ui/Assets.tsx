import { Paper, Typography } from '@mui/material';
import { AssetsList } from './AssetsList/AssetsList';
import { AssetsData } from '../model/types/AssetsSchema';

interface AssetsProps {
  assets: AssetsData[];
  transactionsToggle: (ticker: string) => void;
}

export const Assets = ({ assets, transactionsToggle }: AssetsProps) => (
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

    <AssetsList transactionsToggle={transactionsToggle} assetsList={assets} />
  </Paper>
);

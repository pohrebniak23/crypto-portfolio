import { Paper, Typography } from '@mui/material';
import { getPortfolioDataSelector } from 'entities/Portfolio/model/selectrors/getPortfolioDataSelector';
import { useSelector } from 'react-redux';
import { PortfolioAssetsList } from './PortfolioAssetsList/PortfolioAssetsList';

export const PortfolioAssets = () => {
  const portfolioList = useSelector(getPortfolioDataSelector);

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        pt: 1,
        px: 2,
        pb: 1,
        backgroundColor: '#fff',
        borderRadius: 3,
        height: 'max-content',
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Assets
      </Typography>

      <PortfolioAssetsList portfolioList={portfolioList} />
    </Paper>
  );
};

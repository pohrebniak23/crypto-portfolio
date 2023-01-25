import { Grid, Paper, Typography } from '@mui/material';
import { MessageCenter } from 'shared/ui/MessageCenter/MessageCenter';
import { Portfolio } from '../../model/types/PortfolioSchema';
import { PortfolioInfo } from '../PortoflioInfo/PortfolioInfo';
import { AssetsList } from './AssetsList/AssetsList';

interface AssetsProps {
  portfolio: Portfolio[];
}

export const Assets = ({ portfolio }: AssetsProps) =>
  portfolio.length > 0 ? (
    <>
      <Grid
        container
        item
        md={12}
        lg={12}
        xl={12}
        alignContent="start"
        rowSpacing={2}
        columnSpacing={2}
      >
        <Grid item lg={12} xl={12}>
          <PortfolioInfo />
        </Grid>
      </Grid>

      <Grid item lg={12} xl={12}>
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

          <AssetsList portfolioList={portfolio} />
        </Paper>
        {/* {!isOpen ? : <Transactions />} */}
      </Grid>
    </>
  ) : (
    <MessageCenter text="Your portfolio is empty" />
  );

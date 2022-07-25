import React from 'react';
import { Box, Drawer, Paper } from '@mui/material';
import { BuyCrypto } from '../ActionsWithPortfolio/BuyCrypto';
import { TabPanel } from './TabPanel';
import { SellCrypto } from '../ActionsWithPortfolio/SellCrypto';
import { StyledTab, StyledTabs } from '../UI/StyledTabs';

type Props = {
  rightBarOpen: boolean
}

export const TabsBlock: React.FC<Props> = React.memo(({ rightBarOpen }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Drawer
        open={rightBarOpen}
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            right: '20px',
            height: 'calc(100vh - 32px)',
            top: '16px',
            backgroundColor: 'transparent',
            borderRadius: 4,
            border: 0,
            p: '4px',
          },
        }}
        variant="persistent"
        anchor="right"
      >
        <Paper
          elevation={3}
          sx={{
            py: 2,
            px: 3,
            width: '300px',
            borderRadius: 4,
            height: '100%',
          }}
        >
          <Box>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
        >
          <StyledTab label="Buy" id="simple-tab-0" />
          <StyledTab label="Sell" id="simple-tab-1" />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BuyCrypto />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SellCrypto />
      </TabPanel>
        </Paper>
      </Drawer>
  );
});

import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { BuyCrypto } from '../BuyCrypto/BuyCrypto';
import { TabPanel } from './TabPanel';

export const TabsBlock: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Buy" id="simple-tab-0" />
          <Tab label="Sell" id="simple-tab-1" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BuyCrypto />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </>
  );
};

import { Box, Drawer } from '@mui/material';
import { StyledTab, StyledTabs } from 'components/UI/StyledTabs';
import React from 'react';
import { TabPanelList } from '../TabPanelList/TabPanelList';

type Props = {
  rightBarOpen: boolean;
  setRightBarOpen: () => void;
};

export const AddNewTransactionTabs: React.FC<Props> = React.memo(
  ({ rightBarOpen, setRightBarOpen }) => {
    const [currentTab, setCurrentTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, tab: number) => {
      setCurrentTab(tab);
    };

    return (
      <Drawer
        open={rightBarOpen}
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            right: '20px',
            height: 'calc(100vh - 32px)',
            width: '300px',
            top: '16px',
            backgroundColor: '#fff',
            borderRadius: 4,
            border: 0,
            p: 3,
          },
        }}
        anchor="right"
        onClose={setRightBarOpen}
      >
        <Box>
          <StyledTabs
            value={currentTab}
            onChange={handleChange}
            aria-label="tabs"
          >
            <StyledTab label="Buy" id="simple-tab-0" />
            <StyledTab label="Sell" id="simple-tab-1" />
          </StyledTabs>
        </Box>
        <TabPanelList currentTab={currentTab} />
      </Drawer>
    );
  },
);

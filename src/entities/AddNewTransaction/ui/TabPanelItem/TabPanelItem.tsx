import React from 'react';

interface TabPanelItemProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanelItem: React.FC<TabPanelItemProps> = React.memo(
  ({ children, value, index }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </div>
  ),
);

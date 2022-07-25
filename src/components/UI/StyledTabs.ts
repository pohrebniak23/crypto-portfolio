import { styled, Tab, Tabs } from "@mui/material";

export const StyledTabs = styled(Tabs)({
  minHeight: 'auto',
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-around',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
})

export const StyledTab = styled(Tab)({
  borderRadius: 8,
  minHeight: 'auto',
  width: 'max-content',
  transition: '.4s',
  fontWeight: '600',
  color: '#0C1643',
  backgroundColor: '#E8F0FB',
  padding: '10px 40px',
  '&.Mui-selected': {
    color: '#fff',
    backgroundColor: '#0C1643',
  },
});
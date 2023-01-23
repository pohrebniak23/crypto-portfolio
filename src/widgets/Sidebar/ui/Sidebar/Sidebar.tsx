import { Button, Drawer, List } from '@mui/material';
import { UserActions } from 'entities/User';
import React, { useCallback } from 'react';
import { ReactComponent as Logo } from 'shared/assets/images/logo.svg';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { SidebarItemsList } from '../../model/SidebarItemsList';
import { SidebarItem } from '../SidebarItem/SidebarItem';

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const drawerWidth = 240;

  const onLogout = useCallback(() => {
    dispatch(UserActions.logout());
  }, [dispatch]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        height: 'calc(100vh - 16px)',
        mr: 1,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          height: 'calc(100vh - 16px)',
          position: 'static !important',
          borderRadius: 3,
          padding: 2,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Logo style={{ width: '100%', height: 'auto' }} />
      <List>
        {SidebarItemsList.map((item) => (
          <SidebarItem key={item.to} to={item.to} text={item.text} />
        ))}
      </List>

      <Button
        type="button"
        onClick={onLogout}
        variant="contained"
        sx={{
          mt: 'auto',
          mb: 3,
        }}
      >
        Logout
      </Button>
    </Drawer>
  );
};

import { Button, Drawer, List, ListItem } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import {ReactComponent as Logo} from '../../assets/images/logo.svg';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../redux/reducers/Auth/AuthSlice';

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const drawerWidth = 240;

  const links = [
    { text: 'Home', to: '/' },
    { text: 'Portfolio', to: '/portfolio' },
  ];

  const logOut = () => {
    const auth = getAuth();

    dispatch(logout());
    signOut(auth);
  }

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
        {links.map((item) => (
          <ListItem key={item.to} disablePadding sx={{ pb: 1.5 }}>
            <NavLink
              to={item.to}
              style={({isActive}) => ({
                background: isActive ? '#0C1643' : '#E8F0FB',
                color: isActive ? '#fff' : '#0C1643',
                fontSize: '16px',
                padding: '13px 10px',
                borderRadius: '8px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                fontFamily: 'sans-serif',
                lineHeight: '100%',
                fontWeight: '600',
              })}
            >
              {item.text}
            </NavLink>
          </ListItem>
        ))}
       
      </List>

      <Button
        type="button"
        onClick={logOut}
        variant="contained"
        sx={{
          mt: 'auto',
          mb: 3
        }}
      >
        Logout
      </Button>
    </Drawer>
  );
};

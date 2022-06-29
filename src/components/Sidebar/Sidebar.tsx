import { Button, Drawer, List, ListItem } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import {ReactComponent as Logo} from '../../assets/images/logo.svg';

export const Sidebar: React.FC = () => {
  const drawerWidth = 280;

  const links = [
    { text: 'Home', to: '/' },
    { text: 'Portfolio', to: '/portfolio' },
  ];

  const logOut = () => {
    const auth = getAuth();
    signOut(auth);
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        height: 'calc(100vh - 32px)',
        '& .MuiDrawer-paper': {
          width: drawerWidth - 32,
          boxSizing: 'border-box',
          backgroundColor: 'secondary.main',
          height: 'calc(100vh - 32px)',
          borderRadius: 7,
          padding: 2,
          margin: 2,
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
              style={isActive => ({
                background: isActive ? '#E8F0FB' : '#000',
                color: isActive ? '#0C1643' : '#fff',
                fontSize: '18px',
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

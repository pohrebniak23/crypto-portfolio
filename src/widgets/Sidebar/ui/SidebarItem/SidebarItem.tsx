import { ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface SidebarItemProps {
  to: string;
  text: string;
}

export const SidebarItem = ({ to, text }: SidebarItemProps) => (
  <ListItem key={to} disablePadding sx={{ pb: 1.5 }}>
    <NavLink
      to={to}
      style={({ isActive }) => ({
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
      {text}
    </NavLink>
  </ListItem>
);

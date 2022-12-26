import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

interface PortfolioAssetsMenuProps {
  id: string;
}

export const PortfolioAssetsMenu = React.memo(
  ({ id }: PortfolioAssetsMenuProps) => {
    // const dispatch = useAppDispatch();
    console.log(id);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const removeCrypto = () => {
      setAnchorEl(null);
      // dispatch(removeFromPortfolio(id));
      // dispatch(removeTransactions(id));
    };

    const openTransactions = () => {
      setAnchorEl(null);
      // dispatch(toggleTransactions(true));
      // dispatch(setTransactionCoin(id));
    };

    return (
      <div>
        <IconButton
          aria-label="more"
          aria-haspopup="true"
          onClick={(event: React.MouseEvent<HTMLElement>) =>
            setAnchorEl(event.currentTarget)
          }
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem selected={false} onClick={() => openTransactions()}>
            <ListItemIcon>
              <CompareArrowsIcon fontSize="small" />
            </ListItemIcon>
            Transactions
          </MenuItem>
          <MenuItem selected={false} onClick={() => removeCrypto()}>
            <ListItemIcon>
              <DeleteOutlineIcon fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  },
);

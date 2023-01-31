import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { removeCoinFromPortfolio } from 'entities/Assets/model/services/removeCoinFromAssets';
import React, { useState } from 'react';
import { useAppDispatch } from 'shared/hooks/redux';

interface AssetsMenuProps {
  coinId: string;
  coinTicker: string;
  transactionsToggle: (ticker: string) => void;
}

export const AssetsMenu = React.memo(({ coinId, coinTicker, transactionsToggle }: AssetsMenuProps) => {
  const dispatch = useAppDispatch();
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const removeCrypto = () => {
    setAnchorElement(null);
    dispatch(removeCoinFromPortfolio(coinId));
  };

  const openTransactions = () => {
    setAnchorElement(null);
    transactionsToggle(coinTicker);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-haspopup="true"
        onClick={(event: React.MouseEvent<HTMLElement>) =>
          setAnchorElement(event.currentTarget)
        }
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={() => setAnchorElement(null)}
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
});

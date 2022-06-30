import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  TextField,
} from '@mui/material';
import { CoinItem } from './CoinItem';
import './selectCoin.sass';
import { useAppSelector } from '../../hooks/redux';
import { editBase, editQuote } from '../../redux/reducers/Portfolio/PortfolioSlice';

export const SelectCoin: React.FC = () => {
  const dispatch = useDispatch();
  const { coins, selectedCoins } = useAppSelector((state) => state.portfolio);
  const [search, setSearch] = useState('');

  const searchHandle = (value: string) => {
    setSearch(value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()),
  );

  const closeSarch = () => {
    dispatch(editBase(false));
    dispatch(editQuote(false));
  };

  return (
    <Dialog
      open={selectedCoins.baseEditing}
      onClose={closeSarch}
      sx={{
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          width: '500px',
          p: 3,
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" sx={{ p: 0, pb: 2, textAlign: 'center' }}>
          Select coin
        </Typography>
        <DialogContent sx={{ p: 0 }}>
          <TextField
            type="text"
            onChange={(e: any) => searchHandle(e.target.value)}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{
              width: '100%',
              borderRadius: 4,
              pb: 2,
            }}
          />
          <Box
            sx={{
              height: '420px',
            }}
          >
            {filteredCoins.map((coin) => (
              <CoinItem key={coin.id} coin={coin} />
            ))}
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

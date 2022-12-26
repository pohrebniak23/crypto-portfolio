/* eslint-disable import/no-cycle */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Coin } from 'entities/Coin';
import { AddNewTransactionSchema } from '../types/AddNewTransactionSchema';

const initialState: AddNewTransactionSchema = {
  baseCurrencyTicker: 'bitcoin',
  baseCoinEditing: false,
  quoteCurrencyTicker: 'tether',
  quoteCoinEditing: false,
  isOpen: false,
};

export const addNewTransactionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setBaseEditing: (state, action: PayloadAction<boolean>) => {
      state.baseCoinEditing = action.payload;
    },
    setQuoteEditing: (state, action: PayloadAction<boolean>) => {
      state.quoteCoinEditing = action.payload;
    },
    setBaseCoin: (state, action: PayloadAction<Coin | undefined>) => {
      state.baseCoin = action.payload;
    },
    setQuoteCoin: (state, action: PayloadAction<Coin | undefined>) => {
      state.quoteCoin = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginByUsernameService.pending, (state) => {
  //       state.error = undefined;
  //       state.isLoading = true;
  //     })
  //     .addCase(loginByUsernameService.fulfilled, (state) => {
  //       state.isLoading = false;
  //     })
  //     .addCase(loginByUsernameService.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const {
  reducer: AddNewTransactionReducer,
  actions: AddNewTransactionActions,
} = addNewTransactionSlice;

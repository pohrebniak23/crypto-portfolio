/* eslint-disable import/no-cycle */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Coin } from 'entities/Coin';
import { addTransactionService } from '../services/addTransactionService';
import { AddNewTransactionSchema } from '../types/AddNewTransactionSchema';

const initialState: AddNewTransactionSchema = {
  baseCurrencyTicker: 'bitcoin',
  baseCoinEditing: false,
  quoteCurrencyTicker: 'tether',
  quoteCoinEditing: false,
  isOpen: false,
  status: 'success',
};

export const addNewTransactionSlice = createSlice({
  name: 'addNewTransactionSlice',
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
    setBaseTicker: (state, action: PayloadAction<string>) => {
      state.baseCurrencyTicker = action.payload;
    },
    setQuoteTicker: (state, action: PayloadAction<string>) => {
      state.quoteCurrencyTicker = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTransactionService.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTransactionService.fulfilled, (state) => {
        state.status = 'success';
        state.isOpen = false;
      })
      .addCase(addTransactionService.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.payload;
      });
  },
});

export const {
  reducer: AddNewTransactionReducer,
  actions: AddNewTransactionActions,
} = addNewTransactionSlice;

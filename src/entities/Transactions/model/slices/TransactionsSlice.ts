import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchTransactionsData } from '../services/fetchTransactionsData';
import {
  Transactions,
  TransactionsSchema,
} from '../types/TransactionsSchema';

const initialState: TransactionsSchema = {
  transactions: [],
  isLoading: false,
  isInited: false,
  isTransactionsOpen: false,
  transactionsCoin: '',
};

export const TransactionsSlice = createSlice({
  name: 'TransactionsSlice',
  initialState,
  reducers: {
    setTransactionsData(state, action: PayloadAction<Transactions[]>) {
      state.transactions = action.payload;
    },
    setTransactionsToggle(state, action: PayloadAction<boolean>) {
      state.isTransactionsOpen = action.payload;
    },
    setTransactionCoin(state, action: PayloadAction<string>) {
      state.transactionsCoin = action.payload;
    },
    setInited: (state) => {
      state.isInited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchTransactionsData.fulfilled,
        (state, action: PayloadAction<Transactions[]>) => {
          state.isLoading = false;
          state.isInited = true;
          state.transactions = action.payload;
        },
      )
      .addCase(fetchTransactionsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: TransactionsReducer, actions: TransactionsActions } =
  TransactionsSlice;

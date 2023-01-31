import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
  extraReducers: {},
});

export const { reducer: TransactionsReducer, actions: TransactionsActions } =
  TransactionsSlice;

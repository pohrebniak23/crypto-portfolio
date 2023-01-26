import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Portfolio, PortfolioSchema, Transaction } from '../types/PortfolioSchema';

const initialState: PortfolioSchema = {
  portfolioData: [],
  transactions: [],
  isLoading: false,
  isInited: false,
  isTransactionsOpen: false,
  transactionsCoin: "",
};

export const PortfolioSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setPortfolioData(state, action: PayloadAction<Portfolio[]>) {
      state.portfolioData = action.payload;
    },
    setTransactionsData(state, action: PayloadAction<Transaction[]>) {
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

export const { reducer: PortfolioReducer, actions: PortfolioActions } =
  PortfolioSlice;

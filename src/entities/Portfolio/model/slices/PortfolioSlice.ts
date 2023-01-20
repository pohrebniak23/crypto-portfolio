import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Portfolio, PortfolioSchema } from '../types/PortfolioSchema';

const initialState: PortfolioSchema = {
  portfolioData: [],
  isLoading: false,
  isInited: false,
};

export const PortfolioSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setPortfolioData(state, action: PayloadAction<Portfolio[]>) {
      state.portfolioData = action.payload;
    },
    setInited: (state) => {
      state.isInited = true;
    },
  },
  extraReducers: {},
});

export const { reducer: PortfolioReducer, actions: PortfolioActions } =
  PortfolioSlice;

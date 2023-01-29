import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { PortfolioActions } from '../slices/PortfolioSlice';
import { Transaction } from '../types/PortfolioSchema';

interface TransactionDataProps {
  userId: string;
  coinTicker: string;
}

export const fetchTransactionsData = createAsyncThunk<
  Transaction,
  TransactionDataProps,
  ThunkConfig<string>
>('portfolio/fetchTransactionsData', async ({userId, coinTicker}, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions/ticker`, {
      params: {
        userId,
        ticker: coinTicker
      },
      headers: {
        authorization: '1',
      },
    });

    if (!response.data) {
      rejectWithValue('Server error');
    }

    dispatch(PortfolioActions.setTransactionsData(response.data));

    return response.data;
  } catch (e: unknown) {
    return rejectWithValue("Error");
  }
});

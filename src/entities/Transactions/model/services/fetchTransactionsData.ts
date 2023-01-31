import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { Transactions } from '../types/TransactionsSchema';
import { TransactionsActions } from '../slices/TransactionsSlice';

interface TransactionDataProps {
  userId: string;
  coinTicker: string;
}

export const fetchTransactionsData = createAsyncThunk<
  Transactions,
  TransactionDataProps,
  ThunkConfig<string>
>(
  'transactions/fetchTransactionsData',
  async ({ userId, coinTicker }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/transactions/ticker`,
        {
          params: {
            userId,
            ticker: coinTicker,
          },
          headers: {
            authorization: '1',
          },
        },
      );

      if (!response.data) {
        rejectWithValue('Server error');
      }

      dispatch(TransactionsActions.setTransactionsData(response.data));

      return response.data;
    } catch (e: unknown) {
      return rejectWithValue('Error');
    }
  },
);

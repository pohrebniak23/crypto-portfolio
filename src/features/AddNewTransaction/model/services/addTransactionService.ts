import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';
import { fetchPortfolioData } from '../../../../entities/Portfolio/model/services/fetchPortfolioData';
import { Transaction } from '../../../../entities/Portfolio/model/types/PortfolioSchema';
import { getUserData } from '../../../../entities/User/model/selectors/getUserData';
import { NewTransactionData } from '../types/AddNewTransactionSchema';

export const addTransactionService = createAsyncThunk<
  Transaction,
  NewTransactionData,
  ThunkConfig<string>
>('addTransactionService', async (transactionData, thunkAPI) => {
  const { rejectWithValue, getState, dispatch } = thunkAPI;

  const user = getUserData(getState());

  if (user) {
    try {
      const response = await axios.post<Transaction>(
        `http://localhost:9000/transactions`,
        {
          ...transactionData,
        },
      );

      dispatch(fetchPortfolioData(user.id));

      return response.data;
    } catch (e) {
      return rejectWithValue('Error');
    }
  } else {
    return rejectWithValue('Error');
  }
});

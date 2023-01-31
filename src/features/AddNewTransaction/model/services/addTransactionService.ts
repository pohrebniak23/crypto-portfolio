import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';
import { fetchAssetsData } from 'entities/Assets';
import { Transactions } from 'entities/Transactions';
import { getUserData } from '../../../../entities/User/model/selectors/getUserData';
import { NewTransactionData } from '../types/AddNewTransactionSchema';

export const addTransactionService = createAsyncThunk<
  Transactions,
  NewTransactionData,
  ThunkConfig<string>
>('addTransactionService', async (transactionData, thunkAPI) => {
  const { rejectWithValue, getState, dispatch } = thunkAPI;

  const user = getUserData(getState());

  if (user) {
    try {
      const response = await axios.post<Transactions>(
        `${process.env.REACT_APP_API_URL}/transactions/new`,
        {
          ...transactionData,
        },
      );

      dispatch(fetchAssetsData(user.id));

      return response.data;
    } catch (e) {
      return rejectWithValue('Error');
    }
  } else {
    return rejectWithValue('Error');
  }
});

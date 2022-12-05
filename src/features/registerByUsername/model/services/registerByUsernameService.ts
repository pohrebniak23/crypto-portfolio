/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { User, UserActions } from 'entity/User';
import { RegisterByUsernameData } from '../types/registerByUsernameSchema';

export const registerByUsernameService = createAsyncThunk<
  User,
  RegisterByUsernameData,
  ThunkConfig<string>
>('loginByUsernameService', async (registerData, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    const response = await axios.post<User>(
      'http://localhost:8000/register',
      registerData,
    );

    if (!response.data) {
      rejectWithValue('Server error');
    }

    dispatch(UserActions.setAuthData(response.data));

    return response.data;
  } catch (e) {
    return rejectWithValue('Error');
  }
});

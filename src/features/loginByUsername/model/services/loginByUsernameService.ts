/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { User, UserActions } from 'entity/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/consts';
import { LoginByUsernameData } from '../types/loginByUsernameSchema';

export const loginByUsernameService = createAsyncThunk<
  User,
  LoginByUsernameData,
  ThunkConfig<string>
>('loginByUsernameService', async (authData, thunkAPI) => {
  const { dispatch, extra, rejectWithValue } = thunkAPI;

  try {
    const response = await axios.post<User>(
      'http://localhost:8000/login',
      authData,
    );

    if (!response.data) {
      rejectWithValue('Server error');
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
    dispatch(UserActions.setAuthData(response.data));

    if (extra.navigate) {
      extra.navigate('/');
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('Error');
  }
});

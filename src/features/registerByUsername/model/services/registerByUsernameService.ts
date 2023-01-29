/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { User, UserActions } from 'entities/User';
import { NavigateFunction } from 'react-router-dom';
import { RegisterByUsernameData } from '../types/registerByUsernameSchema';

interface RegisterByUsernameService {
  data: RegisterByUsernameData;
  navigate: NavigateFunction;
}

export const registerByUsernameService = createAsyncThunk<
  User,
  RegisterByUsernameService,
  ThunkConfig<string>
>('registerByUsernameService', async ({ data, navigate }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    const response = await axios.post<User>(
      `${process.env.REACT_APP_API_URL}/users/create`,
      {
        login: data.username,
        password: data.password
      },
      {
        headers: {
          authorization: '123',
        },
      },
    );

    if (!response.data) {
      rejectWithValue('Server error');
    }

    dispatch(UserActions.setAuthData(response.data));
    navigate('/');

    return response.data;
  } catch (e) {
    return rejectWithValue('Error');
  }
});

/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { User, UserActions } from 'entities/User';
import { NavigateFunction } from 'react-router-dom';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/consts';
import { LoginByUsernameData } from '../types/loginByUsernameSchema';

interface LoginByUsernameSchema {
  data: LoginByUsernameData;
  navigate: NavigateFunction;
}

export const loginByUsernameService = createAsyncThunk<
  User,
  LoginByUsernameSchema,
  ThunkConfig<string>
>('loginByUsernameService', async ({ data, navigate }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    const response = await axios.post<User>(
      `${process.env.REACT_APP_API_URL}/users/login`,
      {
        login: data.username,
        password: data.password,
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

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
    dispatch(UserActions.setAuthData(response.data));

    navigate('/');

    return response.data;
  } catch (e: any) {
    if (e.message) {
      return rejectWithValue(e.message);
    }

    return rejectWithValue('Error, something went wrong');
  }
});

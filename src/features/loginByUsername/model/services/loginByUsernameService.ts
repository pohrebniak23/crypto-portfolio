/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { User, UserActions } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/consts';
import { LoginByUsernameData } from '../types/loginByUsernameSchema';

export const loginByUsernameService = createAsyncThunk<
  User,
  LoginByUsernameData,
  ThunkConfig<string>
>('loginByUsernameService', async (authData, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const navigate = useNavigate();

  try {
    const response = await axios.post<User>(
      'http://localhost:8000/login',
      authData,
      {
        headers: {
          authorization: true,
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
  } catch (e) {
    return rejectWithValue('Error');
  }
});

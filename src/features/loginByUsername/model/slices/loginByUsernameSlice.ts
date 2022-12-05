/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { loginByUsernameService } from '../services/loginByUsernameService';
import { LoginByUsernameSchema } from '../types/loginByUsernameSchema';

const initialState: LoginByUsernameSchema = {
  isLoading: false,
  error: undefined,
};

export const loginByUsernameSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsernameService.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUsernameService.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginByUsernameService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  reducer: LoginByUsernameReducer,
  actions: LoginByUsernameActions,
} = loginByUsernameSlice;

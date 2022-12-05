/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { registerByUsernameService } from '../services/registerByUsernameService';
import { RegisterByUsernameSchema } from '../types/registerByUsernameSchema';

const initialState: RegisterByUsernameSchema = {
  isLoading: false,
  error: undefined,
};

export const registerByUsernameSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerByUsernameService.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(registerByUsernameService.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerByUsernameService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  reducer: RegisterByUsernameReducer,
  actions: RegisterByUsernameActions,
} = registerByUsernameSlice;

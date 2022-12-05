import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/consts';
import { UserSchema, User } from '../types/UserSchema';

const initialState: UserSchema = {
  userData: undefined,
  inited: false,
};

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<User>) {
      state.userData = action.payload;
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);

      if (user) {
        state.userData = JSON.parse(user);
      }
      state.inited = true;
    },
    logout: (state) => {
      state.userData = undefined;

      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    }
  },
});

export const { reducer: UserReducer, actions: UserActions } = UserSlice;

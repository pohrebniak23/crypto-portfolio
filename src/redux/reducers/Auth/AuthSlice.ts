import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/User";

interface UserState {
  isAuth: boolean,
  user: User | null,
  isLoading: boolean,
  isError: string,
}

const initialState: UserState = {
  isAuth: false,
  user: null,
  isLoading: false,
  isError: '',
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setAuthError(state, action: PayloadAction<string>) {
      state.isError = action.payload;
    }
  }
});


export default AuthSlice.reducer;
export const { setAuth, setUser, setAuthLoading, setAuthError } = AuthSlice.actions;
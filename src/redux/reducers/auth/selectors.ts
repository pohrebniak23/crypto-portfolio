import { RootState } from "../../store";

export const isAuth = (state: RootState) => state.auth.isAuth;

export const isLoading = (state: RootState) => state.auth.isLoading;

export const isError = (state: RootState) => state.auth.isError;

export const userData = (state: RootState) => state.auth.user;
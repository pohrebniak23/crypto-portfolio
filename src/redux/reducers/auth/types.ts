import { User } from "../../../types/User";

export enum AuthAT {
  SET_AUTH = "SET_AUTH",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_USER = "SET_USER",
  SET_ERROR = "SET_ERROR",
}

export interface SetAuthAction {
  type: AuthAT.SET_AUTH,
  payload: boolean,
}

export interface SetIsLoading {
  type: AuthAT.SET_IS_LOADING,
  payload: boolean,
}

export interface SetUser {
  type: AuthAT.SET_USER,
  payload: User,
}

export interface SetError {
  type: AuthAT.SET_ERROR,
  payload: string,
}

export type AuthAction =
  SetIsLoading |
  SetUser |
  SetAuthAction |
  SetError;
import axios from "axios";
import { User } from "../../../types/User"
import { AuthAT } from "./types"

export const AuthAC = {
  setAuth: (isAuth: boolean) => ({
    type: AuthAT.SET_AUTH,
    payload: isAuth
  }),
  setLoading: (isLoading: boolean) => ({
    type: AuthAT.SET_IS_LOADING,
    payload: isLoading
  }),
  setUser: (user: User) => ({
    type: AuthAT.SET_USER,
    payload: user
  }),
  setError: (error: string) => ({
    type: AuthAT.SET_ERROR,
    payload: error,
  }),
  login: (username: string, password: string) => (dispatch: any) => {
    try {
      dispatch(AuthAC.setLoading(true));
      setTimeout(async () => {
        const response = await axios.get<User[]>('./users.json');
        const mockUser = response.data.find(user => (
          user.username === username && user.password === password
        ))
        if (mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);
          dispatch(AuthAC.setAuth(true));
          dispatch(AuthAC.setUser(mockUser));
        } else {
          dispatch(AuthAC.setError('Login or password is incorrect'));
        }

        dispatch(AuthAC.setLoading(false));
      }, 1000);

    } catch (error: any) {
      // dispatch(AuthAC.setLoading(true))
    }
  }
}

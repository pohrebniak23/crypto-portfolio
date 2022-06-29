// import axios from "axios";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { User } from "../../../types/User";
import { AuthAT } from "./types";

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
        const auth = getAuth();
        signInWithEmailAndPassword(auth, username, password)
          .then((userCredential) => {
            dispatch(AuthAC.setAuth(true));
            dispatch(AuthAC.setUser({
              id: userCredential.user.uid,
              username: userCredential.user.email,
            }));
          })
          .catch(() => {
            dispatch(AuthAC.setError('Login or password is incorrect'));
          })
        dispatch(AuthAC.setLoading(false));
      }, 1000);

    } catch (error: any) {
      dispatch(AuthAC.setError('Login or password is incorrect'));
    }
  },
  register: (username: string, password: string) => (dispatch: any) => {
    try {
      dispatch(AuthAC.setLoading(true));
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          dispatch(AuthAC.setAuth(true));
            dispatch(AuthAC.setUser({
              id: userCredential.user.uid,
              username: userCredential.user.email,
            }));
        })
        .catch((error: any) => {
          dispatch(AuthAC.setError(`Registration not completed - ${error}`));
        });

      dispatch(AuthAC.setError(''));
      dispatch(AuthAC.setLoading(false));
    } catch (error: any) {
      dispatch(AuthAC.setError(`${error}`));
    }
  }
}

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AppDispatch } from "../../store";
import { setAuth, setAuthError, setAuthLoading, setUser } from "./AuthSlice";

export const LoginAction = (username: string, password: string) => (dispatch: AppDispatch) => {
  try {
    dispatch(setAuthLoading(true));
    setTimeout(() => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          dispatch(setAuth(true));
          dispatch(setUser({
            id: userCredential.user.uid,
            username: userCredential.user.email,
          }));
        })
        .catch(() => {
          dispatch(setAuthError('Login or password is incorrect'));
        })
      dispatch(setAuthLoading(false));
    }, 1000);

  } catch (error) {
    dispatch(setAuthError('Login or password is incorrect'));
  }
};

export const RegisterAction = (username: string, password: string) => (dispatch: AppDispatch) => {
  try {
    dispatch(setAuthLoading(true));
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        dispatch(setAuth(true));
          dispatch(setUser({
            id: userCredential.user.uid,
            username: userCredential.user.email,
          }));
      })
      .catch((error) => {
        dispatch(setAuthError(`Registration not completed - ${error}`));
      });

    dispatch(setAuthError(''));
    dispatch(setAuthLoading(false));
  } catch (error) {
    dispatch(setAuthError(`${error}`));
  }
}
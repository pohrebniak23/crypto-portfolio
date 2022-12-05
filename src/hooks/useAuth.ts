import { UserActions } from 'entity/User';
import { getUserData } from 'entity/User/model/selectors/getUserData';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserActions.initAuthData());
  }, [dispatch]);

  const isAuth = useAppSelector(getUserData);

  return isAuth;
};

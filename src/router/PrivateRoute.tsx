import { getAuth } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useAppDispatch } from '../hooks/redux';
import { setUser } from '../redux/reducers/Auth/AuthSlice';

interface Props {
  component: React.ComponentType;
}

export const PrivateRoute: React.FC<Props> = ({ component }) => {
  const authFunc = getAuth();
  const [auth, loading] = useAuthState(authFunc);
  const dispatch = useAppDispatch();
  
  if (!loading) {
    if (auth !== null && auth !== undefined) {
      dispatch(setUser({
        username: auth.email,
        id: auth.uid,
      }));
      return (
        <>
          <Sidebar />
          {React.createElement(component)}
        </>
      );
    }

    return <Navigate to="/login" />;
  }

  return <Loader />;
};

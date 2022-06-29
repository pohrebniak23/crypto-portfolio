import { getAuth } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AuthAC } from '../redux/reducers/auth/action-creators';

interface Props {
  component: React.ComponentType;
}

export const PrivateRoute: React.FC<Props> = ({ component }) => {
  const authFunc = getAuth();
  const [auth, loading] = useAuthState(authFunc);
  const dispatch = useDispatch();
  
  if (!loading) {
    if (auth !== null && auth !== undefined) {
      dispatch(AuthAC.setUser({
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

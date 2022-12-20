import { getUserData, getUserInited } from 'entities/User';
import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader/Loader';

interface Props {
  component: React.ComponentType;
}

export const PublicRoute: React.FC<Props> = ({ component }) => {
  const isAuth = useSelector(getUserData);
  const isInited = useSelector(getUserInited);

  // if (isInited) {
  //   if (isAuth) {
  //     return React.createElement(component);
  //   }

  //   return <Navigate to="/" />;
  // }

  return <Loader />;
};

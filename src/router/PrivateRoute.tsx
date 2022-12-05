import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';

interface Props {
  component: React.ComponentType;
}

export const PrivateRoute: React.FC<Props> = ({ component }) => {
  const auth = useAuth();

  if (auth !== null && auth !== undefined) {
    return (
      <>
        <Sidebar />
        {React.createElement(component)}
      </>
    );
  }

  return <Navigate to="/login" />;
};

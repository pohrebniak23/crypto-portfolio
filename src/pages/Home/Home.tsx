import React from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../redux/reducers/auth/selectors'

export const Home: React.FC = () => {
  const user = useSelector(userData);
  return (
    <div className="home">
      {user !== null && (
        <h1>Hi {user?.username}</h1>
      )}
    </div>
  );
};


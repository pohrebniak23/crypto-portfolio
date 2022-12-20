import { getUserData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '../config/AppRoutes';

export const RequireAuth = ({ children }: { children: any }) => {
  const location = useLocation();
  const user = useSelector(getUserData);

  if (!user) {
    return <Navigate to={RoutePath.register} state={{ from: location }} replace />;
  }

  return children;
};

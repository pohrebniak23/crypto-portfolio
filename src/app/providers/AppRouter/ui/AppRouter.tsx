import { Loader } from 'shared/ui/Loader/Loader';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';
import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from '../config/routeConfig';
import { RequireAuth } from './RequireAuth';

export const AppRouter = () => {
  const renderWithAuth = useCallback((route: AppRouteProps) => {
    const element = <Suspense fallback={<Loader />}>{route.element}</Suspense>;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth>
              <Sidebar />
              {element}
            </RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithAuth)}</Routes>;
};

import { AssetsPage } from 'pages/AssetsPage/AssetsPage';
import { HomePage } from 'pages/HomePage/HomePage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { StatisticPage } from 'pages/StatisticPage/StatisticPage';
import { RouteProps } from 'react-router-dom';
import { AppRoutes, RoutePath } from './AppRoutes';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath[AppRoutes.HOME],
    element: <HomePage />,
    authOnly: true,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath[AppRoutes.LOGIN],
    element: <LoginPage />,
  },
  [AppRoutes.REGISTER]: {
    path: RoutePath[AppRoutes.REGISTER],
    element: <RegisterPage />,
  },
  [AppRoutes.ASSETS]: {
    path: RoutePath[AppRoutes.ASSETS],
    element: <AssetsPage />,
    authOnly: true,
  },
  [AppRoutes.STATISTIC]: {
    path: RoutePath[AppRoutes.STATISTIC],
    element: <StatisticPage />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};

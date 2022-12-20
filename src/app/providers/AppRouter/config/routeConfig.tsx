import { HomePage } from "pages/HomePage/HomePage";
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { PortfolioPage } from "pages/PortfolioPage/PortfolioPage";
import { RegisterPage } from "pages/RegisterPage/RegisterPage";
import { RouteProps } from "react-router-dom";
import { AppRoutes, RoutePath } from "./AppRoutes";

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
  [AppRoutes.PORTFOLIO]: {
    path: RoutePath[AppRoutes.PORTFOLIO],
    element: <PortfolioPage />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <LoginPage />,
  },
};
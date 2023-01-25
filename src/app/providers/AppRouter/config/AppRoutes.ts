export enum AppRoutes {
  HOME = 'home',
  LOGIN = 'login',
  REGISTER = 'register',
  ASSETS = 'assets',
  STATISTIC = 'statistic',
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.ASSETS]: '/assets',
  [AppRoutes.STATISTIC]: '/statistic',
  [AppRoutes.NOT_FOUND]: '*',
};
export enum AppRoutes {
  HOME = 'home',
  LOGIN = 'login',
  REGISTER = 'register',
  PORTFOLIO = 'portfolio',
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.PORTFOLIO]: '/portfolio',
  [AppRoutes.NOT_FOUND]: '*',
};
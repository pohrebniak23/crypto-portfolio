import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { UserReducer } from 'entities/User';
import { LoginByUsernameReducer } from 'features/loginByUsername';
import { RegisterByUsernameReducer } from 'features/registerByUsername';
import PortfolioSlice from 'redux/reducers/Portfolio/PortfolioSlice';
import { coinsAPI } from '../../../../services/CoinsService';
import { StateSchema } from './StateSchema';

const rootReducer = combineReducers<StateSchema>({
  loginByUsername: LoginByUsernameReducer,
  registerByUsername: RegisterByUsernameReducer,
  portfolio: PortfolioSlice,
  user: UserReducer,
  coinsAPI: coinsAPI.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createReduxStore = (
  initialState?: StateSchema,
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coinsAPI.middleware),
  });

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];

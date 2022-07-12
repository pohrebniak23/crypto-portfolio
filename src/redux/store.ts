import { combineReducers, configureStore, AnyAction } from '@reduxjs/toolkit';
import { coinsAPI } from '../services/CoinsService';
import AuthSlice from './reducers/Auth/AuthSlice';
import PortfolioSlice from './reducers/Portfolio/PortfolioSlice';

const combineReducer = combineReducers({
  auth: AuthSlice,
  portfolio: PortfolioSlice,
  [coinsAPI.reducerPath]: coinsAPI.reducer,
});

export type RootState = ReturnType<typeof combineReducer>;

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return combineReducer(state, action);
};

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coinsAPI.middleware),
  });

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

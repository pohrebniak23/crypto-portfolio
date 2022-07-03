import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { coinsAPI } from '../services/CoinsService';
import AuthSlice from './reducers/Auth/AuthSlice';
import PortfolioSlice from './reducers/Portfolio/PortfolioSlice';

const rootReducer = combineReducers({
  auth: AuthSlice,
  portfolio: PortfolioSlice,
  [coinsAPI.reducerPath]: coinsAPI.reducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(coinsAPI.middleware)
  )
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

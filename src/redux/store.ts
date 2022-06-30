import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AuthSlice from './reducers/Auth/AuthSlice';
import PortfolioSlice from './reducers/Portfolio/PortfolioSlice';

const rootReducer = combineReducers({
  auth: AuthSlice,
  portfolio: PortfolioSlice,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

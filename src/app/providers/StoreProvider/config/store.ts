import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { coinsAPI } from 'entities/Coin';
import { PortfolioReducer } from 'entities/Portfolio';
import { UserReducer } from 'entities/User';
import { AddNewTransactionReducer } from 'features/AddNewTransaction';
import { LoginByUsernameReducer } from 'features/loginByUsername';
import { RegisterByUsernameReducer } from 'features/registerByUsername';
import { StateSchema } from './StateSchema';

const rootReducer = combineReducers<StateSchema>({
  loginByUsername: LoginByUsernameReducer,
  registerByUsername: RegisterByUsernameReducer,
  portfolio: PortfolioReducer,
  addNewTransaction: AddNewTransactionReducer,
  user: UserReducer,
  [coinsAPI.reducerPath]: coinsAPI.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createReduxStore = (initialState?: StateSchema) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat(coinsAPI.middleware),
  });

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];

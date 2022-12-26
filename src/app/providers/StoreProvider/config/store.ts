import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { AddNewTransactionReducer } from 'entities/AddNewTransaction';
import { PortfolioReducer } from 'entities/Portfolio';
import { UserReducer } from 'entities/User';
import { LoginByUsernameReducer } from 'features/loginByUsername';
import { RegisterByUsernameReducer } from 'features/registerByUsername';
import { coinsAPI } from '../../../../services/CoinsService';
import { StateSchema } from './StateSchema';

const rootReducer = combineReducers<StateSchema>({
  loginByUsername: LoginByUsernameReducer,
  registerByUsername: RegisterByUsernameReducer,
  portfolio: PortfolioReducer,
  addNewTransaction: AddNewTransactionReducer,
  user: UserReducer,
  coinsAPI: coinsAPI.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createReduxStore = (initialState?: StateSchema) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(coinsAPI.middleware),
  });

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];

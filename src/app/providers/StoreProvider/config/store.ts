import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { UserReducer } from 'entity/User';
import { LoginByUsernameReducer } from 'features/loginByUsername';
import { RegisterByUsernameReducer } from 'features/registerByUsername';
import { NavigateOptions, To } from 'react-router-dom';
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

// const rootReducer = (state: RootState | undefined, action: AnyAction) => {
//   if (action.type === 'auth/logout') {
//     state = undefined;
//   }

//   return combineReducer(state, action);
// };

export const createReduxStore = (
  initialState?: StateSchema,
  navigate?: (to: To, options?: NavigateOptions) => void,
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        coinsAPI: coinsAPI.middleware,
        thunk: {
          extraArgument: {
            navigate,
          },
        },
      }),
  });

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];

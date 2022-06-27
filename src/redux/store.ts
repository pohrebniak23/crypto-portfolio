import { Dispatch } from "react";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { Coin } from "../types/Coin";
import { Portfolio } from "../types/Portfolio";
import { User } from "../types/User";
import { rootReducer } from "./reducers";

export interface RootState {
  portfolio: {
    coins: Coin[],
    selectedCoins: {
      baseCurr: string,
      baseEditing: boolean,
      quoteCurr: string,
      quoteEditing: boolean,
    },
    portfolio: Portfolio[],
  },
  auth: {
    user: User | null,
    isLoading: boolean,
    isError: string,
    isAuth: boolean,
  }
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;

export const dispatchThunk = store.dispatch as typeof store.dispatch | Dispatch<any>

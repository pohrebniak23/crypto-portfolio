import { combineReducers } from "redux";
import { portfolio } from "./portfolio/portfolio";
import { auth } from './auth/auth';

export const rootReducer = combineReducers({
  portfolio,
  auth,
})
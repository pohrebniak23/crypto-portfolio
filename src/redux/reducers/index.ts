import { combineReducers } from "redux";
import { portfolio } from "./portfolio/portfolio";

export const rootReducer = combineReducers({
  portfolio,
})
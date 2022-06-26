import { AddCrypto } from "../../../types/AddCrypto";
import { Coin } from "../../../types/Coin";

export enum ActionTypes {
  SET_COINS = 'SET_COINS',
  EDIT_BASE = 'EDIT_BASE',
  CHANGE_BASE_CURR = 'CHANGE_BASE_CURR',
  EDIT_QUOTE = 'EDIT_QUOTE',
  CHANGE_QUOTE_CURR = 'CHANGE_QUOTE_CURR',
  ADD_TO_PORTFOLIO = 'ADD_TO_PORTFOLIO',
}

export interface SetCoinsAction {
  type: ActionTypes.SET_COINS,
  payload: Coin[],
}

export interface EditBaseAction {
  type: ActionTypes.EDIT_BASE,
  payload: boolean,
}

export interface ChangeBaseCurrAction {
  type: ActionTypes.CHANGE_BASE_CURR,
  payload: string,
}

export interface EditQuoteAction {
  type: ActionTypes.EDIT_QUOTE,
  payload: boolean,
}

export interface ChangeQuoteCurrAction {
  type: ActionTypes.CHANGE_QUOTE_CURR,
  payload: string,
}

export interface AddToPortfolioAction {
  type: ActionTypes.ADD_TO_PORTFOLIO,
  payload: AddCrypto;
}

export type PortfolioAction =
  SetCoinsAction |
  AddToPortfolioAction |
  EditBaseAction |
  ChangeBaseCurrAction |
  EditQuoteAction |
  ChangeQuoteCurrAction;
import { AddCrypto } from "../../../types/AddCrypto";
import { Coin } from "../../../types/Coin";

export enum PortfolioAT {
  SET_COINS = 'SET_COINS',
  EDIT_BASE = 'EDIT_BASE',
  CHANGE_BASE_CURR = 'CHANGE_BASE_CURR',
  EDIT_QUOTE = 'EDIT_QUOTE',
  CHANGE_QUOTE_CURR = 'CHANGE_QUOTE_CURR',
  ADD_TO_PORTFOLIO = 'ADD_TO_PORTFOLIO',
  LOAD_PORTFOLIO = 'LOAD_PORTFOLIO',
}

export interface SetCoinsAction {
  type: PortfolioAT.SET_COINS,
  payload: Coin[],
}

export interface EditBaseAction {
  type: PortfolioAT.EDIT_BASE,
  payload: boolean,
}

export interface ChangeBaseCurrAction {
  type: PortfolioAT.CHANGE_BASE_CURR,
  payload: string,
}

export interface EditQuoteAction {
  type: PortfolioAT.EDIT_QUOTE,
  payload: boolean,
}

export interface ChangeQuoteCurrAction {
  type: PortfolioAT.CHANGE_QUOTE_CURR,
  payload: string,
}

export interface AddToPortfolioAction {
  type: PortfolioAT.ADD_TO_PORTFOLIO,
  payload: AddCrypto;
}

export interface LoadPortfolio {
  type: PortfolioAT.LOAD_PORTFOLIO,
  payload: AddCrypto[],
}

export type PortfolioAction =
  SetCoinsAction |
  AddToPortfolioAction |
  EditBaseAction |
  ChangeBaseCurrAction |
  EditQuoteAction |
  ChangeQuoteCurrAction |
  LoadPortfolio;
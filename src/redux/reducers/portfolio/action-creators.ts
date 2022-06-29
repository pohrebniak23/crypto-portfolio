import { AddCrypto } from "../../../types/AddCrypto";
import { Coin } from "../../../types/Coin";
import { PortfolioAT } from "./types";

export const PortfolioAC = {
  setCoins: (coins: Coin[]) => ({
    type: PortfolioAT.SET_COINS,
    payload: coins,
  }),
  editingBase: (isEditing: boolean) => ({
    type: PortfolioAT.EDIT_BASE,
    payload: isEditing,
  }),
  changeBaseCurr: (coinName: string) => ({
    type: PortfolioAT.CHANGE_BASE_CURR,
    payload: coinName,
  }),
  editingQuote: (isEditing: boolean) => ({
    type: PortfolioAT.EDIT_BASE,
    payload: isEditing,
  }),
  changeQuoteCurr: (coinName: string) => ({
    type: PortfolioAT.CHANGE_QUOTE_CURR,
    payload: coinName,
  }),
  addToPortfolio: (addedCoin: AddCrypto) => ({
    type: PortfolioAT.ADD_TO_PORTFOLIO,
    payload: addedCoin,
  }),
  loadPortfolio: (crypto: AddCrypto[]) => ({
    type: PortfolioAT.LOAD_PORTFOLIO,
    payload: crypto,
  })
};

import { Coin } from "../../../types/Coin";
import { ActionTypes } from "./types";

export const PortfolioAC = {
  setCoins: (coins: Coin[]) => ({
    type: ActionTypes.SET_COINS,
    payload: coins,
  }),
  editingBase: (isEditing: boolean) => ({
    type: ActionTypes.EDIT_BASE,
    payload: isEditing,
  }),
  changeBaseCurr: (coinName: string) => ({
    type: ActionTypes.CHANGE_BASE_CURR,
    payload: coinName,
  }),
  editingQuote: (isEditing: boolean) => ({
    type: ActionTypes.EDIT_BASE,
    payload: isEditing,
  }),
  changeQuoteCurr: (coinName: string) => ({
    type: ActionTypes.CHANGE_QUOTE_CURR,
    payload: coinName,
  }),
  addToPortfolio: (addedCoin: any) => ({
    type: ActionTypes.ADD_TO_PORTFOLIO,
    payload: addedCoin,
  })
};

import { RootState } from "../../store";

export const Coins = (state: RootState) => {
  return state.portfolio.coins;
}

export const BaseCurr = (state: RootState) => {
  return state.portfolio.selectedCoins.baseCurr;
}

export const QuoteCurr = (state: RootState) => {
  return state.portfolio.selectedCoins.quoteCurr;
}

export const BaseEditing = (state: RootState) => {
  return state.portfolio.selectedCoins.baseEditing;
}

export const QuoteEditing = (state: RootState) => {
  return state.portfolio.selectedCoins.quoteEditing;
}

export const PortfolioData = (state: RootState) => {
  return state.portfolio.portfolio;
}
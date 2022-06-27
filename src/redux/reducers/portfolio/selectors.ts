import { RootState } from "../../store";

export const Coins = (state: RootState) => (
  state.portfolio.coins
);

export const BaseCurr = (state: RootState) => (
  state.portfolio.selectedCoins.baseCurr
);

export const QuoteCurr = (state: RootState) => (
  state.portfolio.selectedCoins.quoteCurr
);

export const BaseEditing = (state: RootState) => (
  state.portfolio.selectedCoins.baseEditing
);

export const QuoteEditing = (state: RootState) => (
  state.portfolio.selectedCoins.quoteEditing
);

export const PortfolioData = (state: RootState) => (
  state.portfolio.portfolio
);

import { StateSchema } from 'app/providers/StoreProvider';

export const getPortfolioDataSelector = (state: StateSchema) =>
  state.portfolio.portfolioData;

export const getTransactionsDataSelector = (state: StateSchema) =>
  state.portfolio.transactions;

export const getPortfolioDataInited = (state: StateSchema) =>
  state.portfolio.isInited;

export const getIsTransactionsOpen = (state: StateSchema) =>
  state.portfolio.isTransactionsOpen;

export const getTransactionsCoin = (state: StateSchema) =>
  state.portfolio.transactionsCoin;

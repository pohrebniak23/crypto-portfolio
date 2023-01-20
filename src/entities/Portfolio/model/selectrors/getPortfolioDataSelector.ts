import { StateSchema } from 'app/providers/StoreProvider';

export const getPortfolioDataSelector = (state: StateSchema) =>
  state.portfolio.portfolioData;

export const getPortfolioDataInited = (state: StateSchema) =>
  state.portfolio.isInited;

import { StateSchema } from 'app/providers/StoreProvider';

export const getPortfolioDataSelector = (state: StateSchema) =>
  state.portfolio.portfolioData;

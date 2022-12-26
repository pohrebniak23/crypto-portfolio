export interface Portfolio {
  id: string;
  userId: string;
  avgBuyPrice: number;
  count: number;
  ticker: string;
}

export interface PortfolioSchema {
  isLoading: boolean;
  error?: string;
  portfolioData: Portfolio[];
}
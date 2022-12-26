export interface Portfolio {
  id: string;
  userId: string;
  avgBuyPrice: number;
  count: number;
  name: string;
}

export interface PortfolioSchema {
  isLoading: boolean;
  error?: string;
  portfolioData: Portfolio[];
}
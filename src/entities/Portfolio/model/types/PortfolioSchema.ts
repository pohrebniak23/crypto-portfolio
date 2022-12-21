export interface Portfolio {
  id: string;
  userId: string;
  buyPrice: number;
  count: number;
  name: string;
}

export interface PortfolioSchema {
  isLoading: boolean;
  error?: string;
  portfolioData: Portfolio[];
}
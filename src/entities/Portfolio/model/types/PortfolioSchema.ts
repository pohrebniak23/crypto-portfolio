export interface Portfolio {
  id: string;
  userId: string;
  avgBuyPrice: number;
  count: number;
  ticker: string;
}

export interface Transaction {
  id: string,
  userId: string,
  ticker: string,
  date: string,
  type: string,
  count: number,
  price: number,
}

export interface PortfolioSchema {
  isLoading: boolean;
  error?: string;
  portfolioData: Portfolio[];
  isInited: boolean;
  transactions: Transaction[];
  isTransactionsOpen: boolean;
  transactionsCoin: string;
}
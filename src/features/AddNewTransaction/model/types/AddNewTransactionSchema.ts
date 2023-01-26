import { Coin } from 'entities/Coin';

export interface AddNewTransactionSchema {
  // Base coin
  baseCurrencyTicker: string;
  baseCoin?: Coin;
  baseCoinEditing: boolean;

  // Quote coin
  quoteCurrencyTicker: string;
  quoteCoin?: Coin;
  quoteCoinEditing: boolean;

  status: "loading" | "error" | "success";
  isOpen: boolean;
  errorMessage?: string;
}

export interface NewPortfolioData {
  ticker: string;
  count: number;
  price: number;
  type: 'BUY' | 'SELL';
}

export interface NewTransactionData {
  ticker: string;
  count: number;
  price: number;
  type: 'BUY' | 'SELL';
  date: Date;
  userId: string;
}


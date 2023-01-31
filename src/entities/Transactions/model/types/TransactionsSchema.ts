export interface Transactions {
  id: string,
  userId: string,
  ticker: string,
  date: string,
  type: string,
  count: number,
  price: number,
}

export interface TransactionsSchema {
  isLoading: boolean;
  error?: string;
  transactions: Transactions[];
  isTransactionsOpen: boolean;
  transactionsCoin: string;
  isInited: boolean;
}
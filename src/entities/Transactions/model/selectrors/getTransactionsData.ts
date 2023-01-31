import { StateSchema } from 'app/providers/StoreProvider';

export const getTransactionsData = (state: StateSchema) =>
  state.transactions.transactions;

export const getIsTransactionsOpen = (state: StateSchema) =>
  state.transactions.isTransactionsOpen;

export const getTransactionsCoin = (state: StateSchema) =>
  state.transactions.transactionsCoin;

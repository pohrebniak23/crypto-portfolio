import { StateSchema } from 'app/providers/StoreProvider';

export const getNewTransactionModalOpen = (state: StateSchema) =>
  state.addNewTransaction.isOpen;

export const getBaseCurrencyTicker = (state: StateSchema) =>
  state.addNewTransaction.baseCurrencyTicker;

export const getQuoteCurrencyTicker = (state: StateSchema) =>
  state.addNewTransaction.quoteCurrencyTicker;

export const getBaseCurrencyEditing = (state: StateSchema) =>
  state.addNewTransaction.baseCoinEditing;

export const getQuoteCurrencyEditing = (state: StateSchema) =>
  state.addNewTransaction.quoteCoinEditing;

export const getBaseCurrencyCoin = (state: StateSchema) =>
  state.addNewTransaction.baseCoin;

export const getQuoteCurrencyCoin = (state: StateSchema) =>
  state.addNewTransaction.quoteCoin;

export const getAddNewTransactionStatus = (state: StateSchema) =>
  state.addNewTransaction.status;

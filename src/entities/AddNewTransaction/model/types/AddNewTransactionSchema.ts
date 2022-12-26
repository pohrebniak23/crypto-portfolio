import { Coin } from "entities/Coin";

export interface AddNewTransactionSchema {
  // Base coin
  baseCurrencyTicker: string;
  baseCoin?: Coin;
  baseCoinEditing: boolean;

  // Quote coin
  quoteCurrencyTicker: string;
  quoteCoin?: Coin;
  quoteCoinEditing: boolean;

  isOpen: boolean;
}

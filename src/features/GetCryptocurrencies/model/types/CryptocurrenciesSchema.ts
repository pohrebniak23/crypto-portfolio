import { Coin } from "entities/Coin";

export interface CryptocurrenciesSchema {
  isLoading: boolean;
  error?: string;
  cryptocurrencies: Coin[];
  isInited: boolean;
}
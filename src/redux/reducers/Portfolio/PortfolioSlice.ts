import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuyCrypto } from '../../../types/BuyCrypto';
import { Portfolio } from '../../../types/Portfolio';
import { SellCoin } from '../../../types/SellCoin';
import { Transaction } from '../../../types/Transaction';

interface PortfolioState {
  selectedCoins: {
    baseCurr: string;
    baseEditing: boolean;
    quoteCurr: string;
    quoteEditing: boolean;
  };
  portfolioTotalPrice: {
    price: number;
    time: string;
  }[];
  portfolio: Portfolio[];
  transactions: {
    list: Transaction[];
    isOpen: boolean;
    coin: string;
  };
}

const initialState: PortfolioState = {
  selectedCoins: {
    baseCurr: 'bitcoin',
    baseEditing: false,
    quoteCurr: 'tether',
    quoteEditing: false,
  },
  portfolioTotalPrice: [],
  portfolio: [],
  transactions: {
    list: [],
    isOpen: false,
    coin: '',
  },
};

export const PortfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    editBase(state, action: PayloadAction<boolean>) {
      state.selectedCoins.baseEditing = action.payload;
    },
    editQuote(state, action: PayloadAction<boolean>) {
      state.selectedCoins.quoteEditing = action.payload;
    },
    changeBaseCurr(state, action: PayloadAction<string>) {
      state.selectedCoins.baseCurr = action.payload;
    },
    changeQuoteCurr(state, action: PayloadAction<string>) {
      state.selectedCoins.quoteCurr = action.payload;
    },
    loadPortfolio(state, action: PayloadAction<BuyCrypto[]>) {
      state.portfolio = [...action.payload];
    },
    buyCoin(state, action: PayloadAction<BuyCrypto>) {
      if (state.portfolio.length > 0) {
        const isOld = state.portfolio.some(
          (item: Portfolio) => item.id === action.payload.id,
        );

        if (isOld) {
          state.portfolio = state.portfolio.map((item: Portfolio) => {
            if (item.id === action.payload.id && item.buyPrice) {
              return {
                ...item,
                coinCount: item.coinCount + action.payload.coinCount,
                buyPrice: (item.buyPrice + action.payload.buyPrice) / 2,
              };
            }
            return item;
          });
        } else {
          state.portfolio.push(action.payload);
        }
      } else {
        state.portfolio.push(action.payload);
      }
    },
    sellCoin(state, action: PayloadAction<SellCoin>) {
      if (state.portfolio.length > 0) {
        const isOld = state.portfolio.some(
          (item: Portfolio) => item.id === action.payload.id,
        );

        if (isOld) {
          state.portfolio = state.portfolio.map((item: Portfolio) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                coinCount: item.coinCount - action.payload.coinCount,
              };
            }
            return item;
          });
        } else {
          state.portfolio.push({
            id: action.payload.id,
            buyPrice: 0,
            coinCount: action.payload.coinCount,
          });
        }
      } else {
        state.portfolio.push({
          id: action.payload.id,
          buyPrice: 0,
          coinCount: action.payload.coinCount,
        });
      }
    },
    removeFromPortfolio(state, action: PayloadAction<string>) {
      state.portfolio = state.portfolio.filter(
        (item) => item.id !== action.payload,
      );
    },
    loadTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions.list = action.payload;
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.list.push(action.payload);
    },
    toggleTransactions(state, action: PayloadAction<boolean>) {
      state.transactions.isOpen = action.payload;
    },
    setTransactionCoin(state, action: PayloadAction<string>) {
      state.transactions.coin = action.payload;
    },
    removeTransactions(state, action: PayloadAction<string>) {
      state.transactions.list = state.transactions.list.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export default PortfolioSlice.reducer;
export const {
  editBase,
  editQuote,
  changeBaseCurr,
  changeQuoteCurr,
  buyCoin,
  sellCoin,
  loadPortfolio,
  removeFromPortfolio,
  addTransaction,
  toggleTransactions,
  setTransactionCoin,
  loadTransactions,
  removeTransactions,
} = PortfolioSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coin } from "../../../types/Coin";
import { Portfolio } from "../../../types/Portfolio";

interface PortfolioState {
  coins: Coin[],
  selectedCoins: {
    baseCurr: string,
    baseEditing: boolean,
    quoteCurr: string,
    quoteEditing: boolean,
  },
  portfolio: Portfolio[],
}

const initialState: PortfolioState = {
  coins: [],
  selectedCoins: {
    baseCurr: 'bitcoin',
    baseEditing: false,
    quoteCurr: 'tether',
    quoteEditing: false,
  },
  portfolio: [],
}

export const PortfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setCoins(state, action: PayloadAction<Coin[]>) {
      state.coins = action.payload
    },
    editBase(state, action: PayloadAction<boolean>) {
      state.selectedCoins.baseEditing = action.payload
    },
    editQuote(state, action: PayloadAction<boolean>) {
      state.selectedCoins.quoteEditing = action.payload
    },
    changeBaseCurr(state, action: PayloadAction<string>) {
      state.selectedCoins.baseCurr = action.payload
    },
    changeQuoteCurr(state, action: PayloadAction<string>) {
      state.selectedCoins.quoteCurr = action.payload
    },
    loadPortfolio(state, action: PayloadAction<Portfolio[]>) {
      state.portfolio = [...action.payload]
    },
    addToPortfolio(state, action: PayloadAction<Portfolio>) {
      if (state.portfolio.length > 0) {
        const isOld = state.portfolio.some((item: Portfolio) => item.id === action.payload.id);

        if (isOld) {
          state.portfolio = state.portfolio.map((item: Portfolio) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                coinCount: item.coinCount + action.payload.coinCount,
                buyPrice: (item.buyPrice + action.payload.buyPrice) / 2,
              }
            }
            return item;
          })
        } else {
          state.portfolio.push(action.payload);
        }
      } else {
        state.portfolio.push(action.payload);
      }
    },
    removeFromPortfolio(state, action: PayloadAction<string>) {
      state.portfolio = state.portfolio.filter((item) => item.id !== action.payload);
    }
  }
})

export default PortfolioSlice.reducer;
export const {
  setCoins,
  editBase,
  editQuote,
  changeBaseCurr,
  changeQuoteCurr,
  addToPortfolio,
  loadPortfolio,
  removeFromPortfolio
} = PortfolioSlice.actions;
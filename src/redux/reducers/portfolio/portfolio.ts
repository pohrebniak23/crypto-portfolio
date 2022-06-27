import { PortfolioAT, PortfolioAction } from "./types";
import { Portfolio } from '../../../types/Portfolio'

const initialState = {
  coins: [],
  selectedCoins: {
    baseCurr: 'bitcoin',
    baseEditing: false,
    quoteCurr: 'tether',
    quoteEditing: false,
  },
  portfolio: [],
}

export const portfolio = (
  state = initialState,
  action: PortfolioAction,
) => {
  switch (action.type) {
    case PortfolioAT.SET_COINS:
      return {
        ...state,
        coins: action.payload
      }

    case PortfolioAT.EDIT_BASE:
      return {
        ...state,
        selectedCoins: {
          ...state.selectedCoins,
          baseEditing: action.payload
        }
      }

    case PortfolioAT.CHANGE_BASE_CURR:
      return {
        ...state,
        selectedCoins: {
          ...state.selectedCoins,
          baseCurr: action.payload
        }
      }

    case PortfolioAT.ADD_TO_PORTFOLIO: {
      if (state.portfolio.length > 0) {
        const isOld = state.portfolio.some((item: Portfolio) => item.id === action.payload.id);

        if (isOld) {
          return {
            ...state,
            portfolio: state.portfolio.map((item: Portfolio) => {
              if (item.id === action.payload.id) {
                const newCount = item.coinCount + action.payload.coinCount;
                const newBuyPrice = (item.buyPrice + action.payload.buyPrice) / 2;
                return {
                  ...item,
                  coinCount: newCount,
                  buyPrice: newBuyPrice,
                }
              }
            
            return item;
            })
          }
        }

        return {
          ...state,
          portfolio: [...state.portfolio, action.payload]
        }
      }

      return {
        ...state,
        portfolio: [...state.portfolio, action.payload]
      }
    }

    default:
      return state
  }
}
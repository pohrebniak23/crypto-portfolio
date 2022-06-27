import { AuthAction, AuthAT } from "./types"

const initialState = {
  isAuth: false,
  user: null,
  isLoading: false,
  isError: '',
}

export const auth = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthAT.SET_AUTH: {
      return {
        ...state,
        isAuth: action.payload,
      }
    }

    case AuthAT.SET_USER: {
      return {
        ...state,
        user: action.payload,
      }
    }

    case AuthAT.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      }
    }

    case AuthAT.SET_ERROR: {
      return {
        ...state,
        isError: action.payload,
      }
    }

    default:
      return state;
  }
}
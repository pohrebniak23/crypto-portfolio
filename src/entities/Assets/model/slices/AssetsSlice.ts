import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AssetsData, AssetsSchema } from '../types/AssetsSchema';

const initialState: AssetsSchema = {
  assetsData: [],
  isLoading: false,
  isInited: false,
};

export const AssetsSlice = createSlice({
  name: 'AssetsSlice',
  initialState,
  reducers: {
    setAssetsData(state, action: PayloadAction<AssetsData[]>) {
      state.assetsData = action.payload;
    },
    setInited: (state) => {
      state.isInited = true;
    },
  },
  extraReducers: {},
});

export const { reducer: AssetsReducer, actions: AssetsActions } = AssetsSlice;

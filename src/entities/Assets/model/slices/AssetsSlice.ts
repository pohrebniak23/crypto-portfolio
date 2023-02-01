import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAssetsData } from '../services/fetchAssetsData';
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetsData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAssetsData.fulfilled,
        (state, action: PayloadAction<AssetsData[]>) => {
          state.isLoading = false;
          state.isInited = true;
          state.assetsData = action.payload;
        },
      )
      .addCase(fetchAssetsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: AssetsReducer, actions: AssetsActions } = AssetsSlice;

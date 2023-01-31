import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';
import { AssetsData, fetchAssetsData, getAssetsData } from 'entities/Assets';
import { getUserData } from 'entities/User';
import { NewPortfolioData } from '../types/AddNewTransactionSchema';

export const updateAssetsDataService = createAsyncThunk<
  AssetsData,
  NewPortfolioData,
  ThunkConfig<string>
>('addNewTransaction/updateAssetsData', async (transactionData, thunkAPI) => {
  const { rejectWithValue, getState, dispatch } = thunkAPI;

  const assetsData = getAssetsData(getState());
  const user = getUserData(getState());

  const isInPortfolio =
    assetsData.find((item) => item.ticker === transactionData.ticker) || null;

  if (user) {
    if (isInPortfolio) {
      let totalCount = isInPortfolio.count;

      if (transactionData.type === 'BUY') {
        totalCount += transactionData.count;
      } else if (transactionData.type === 'SELL') {
        totalCount -= transactionData.count;
      }

      try {
        const response = await axios.put<AssetsData>(
          `${process.env.REACT_APP_API_URL}/assets/update`,
          {
            ...isInPortfolio,
            count: totalCount,
            avgBuyPrice:
              (isInPortfolio.avgBuyPrice + transactionData.price) / 2,
          },
        );

        dispatch(fetchAssetsData(user.id));

        return response.data;
      } catch (e) {
        return rejectWithValue('Error');
      }
    } else {
      try {
        const response = await axios.post<AssetsData>(
          `${process.env.REACT_APP_API_URL}/assets/add`,
          {
            userId: `${user?.id}`,
            ticker: transactionData.ticker,
            count: transactionData.count,
            avgBuyPrice: transactionData.price,
          },
        );

        dispatch(fetchAssetsData(user.id));

        return response.data;
      } catch (e) {
        return rejectWithValue('Error');
      }
    }
  } else {
    return rejectWithValue('Error');
  }
});

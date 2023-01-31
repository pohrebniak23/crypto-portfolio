import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';
import { getUserData } from '../../../User/model/selectors/getUserData';
import { AssetsData } from '../types/AssetsSchema';
import { fetchAssetsData } from './fetchAssetsData';

export const removeCoinFromPortfolio = createAsyncThunk<
  AssetsData,
  string,
  ThunkConfig<string>
>('assets/removeCoinFromAssets', async (id, thunkAPI) => {
  const { rejectWithValue, getState, dispatch } = thunkAPI;

  const user = getUserData(getState());

  if (user) {
    try {
      const response = await axios.delete<AssetsData>(
        `${process.env.REACT_APP_API_URL}/portfolio/${id}`,
      );

      dispatch(fetchAssetsData(user.id));

      return response.data;
    } catch (e) {
      return rejectWithValue('Error');
    }
  } else {
    return rejectWithValue('Error');
  }
});

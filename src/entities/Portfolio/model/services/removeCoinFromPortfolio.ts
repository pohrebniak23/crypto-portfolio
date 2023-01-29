import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';
import { Portfolio, fetchPortfolioData } from 'entities/Portfolio';
import { getUserData } from '../../../User/model/selectors/getUserData';

export const removeCoinFromPortfolio = createAsyncThunk<
  Portfolio,
  string,
  ThunkConfig<string>
>('removeCoinFromPortfolio', async (id, thunkAPI) => {
  const { rejectWithValue, getState, dispatch } = thunkAPI;

  const user = getUserData(getState());

  if (user) {
    try {
      const response = await axios.delete<Portfolio>(
        `${process.env.REACT_APP_API_URL}/portfolio/${id}`,
      );

      dispatch(fetchPortfolioData(user.id));

      return response.data;
    } catch (e) {
      return rejectWithValue('Error');
    }
  } else {
    return rejectWithValue('Error');
  }
});

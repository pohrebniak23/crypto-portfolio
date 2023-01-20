import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { PortfolioActions } from '../slices/PortfolioSlice';
import { Portfolio } from '../types/PortfolioSchema';

export const fetchPortfolioData = createAsyncThunk<
  Portfolio,
  string,
  ThunkConfig<string>
>('portfolio/fetchPortfolioData', async (userId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    const response = await axios.get('http://localhost:9000/portfolio', {
      params: {
        userId,
        _expand: 'userId',
      },
      headers: {
        authorization: '1',
      },
    });

    if (!response.data) {
      rejectWithValue('Server error');
    }

    dispatch(PortfolioActions.setPortfolioData(response.data));
    dispatch(PortfolioActions.setInited());

    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { AssetsData } from '../types/AssetsSchema';

export const fetchAssetsData = createAsyncThunk<
  AssetsData[],
  string,
  ThunkConfig<string>
>('assets/fetchAssetsData', async (userId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/assets/`,
      {
        params: {
          userId,
        },
      },
    );

    if (!response.data) {
      rejectWithValue('Server error');
    }

    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

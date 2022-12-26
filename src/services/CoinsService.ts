import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Coin } from 'entities/Coin';

const GEKO_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export const coinsAPI = createApi({
  reducerPath: 'coinsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${GEKO_URL}` }),
  endpoints: (build) => ({
    fetchAllCoins: build.query<Coin[], string>({
      query: () => ({
        url: '/',
      }),
    }),
  }),
});

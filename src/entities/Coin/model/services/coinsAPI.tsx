import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Coin } from 'entities/Coin';

const COINGEKO_URL = 'https://api.coingecko.com/api/v3/';

interface FetchCoinsProps {
  currency?: string;
  order?: string;
  perPage?: string | number;
  page?: string | number;
  sparkline?: string;
  interval?: string;
}

export const coinsAPI = createApi({
  reducerPath: 'coinsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${COINGEKO_URL}` }),
  endpoints: (build) => ({
    fetchMarketCoins: build.query<Coin[], FetchCoinsProps>({
      query: (args) => {
        const {
          currency = 'usd',
          order = 'market_cap_desc',
          perPage = '100',
          page = '1',
          sparkline = 'false',
          interval = '7d',
        } = args;

        return {
          url: `coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${interval}`,
        };
      },
    }),
    getCoinById: build.query<any, string>({
      query: (id) => ({ url: `coins/${id}` }),
    }),
  }),
});

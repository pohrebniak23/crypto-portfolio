export interface AssetsData {
  id: string;
  userId: string;
  avgBuyPrice: number;
  count: number;
  ticker: string;
}

export interface AssetsSchema {
  isLoading: boolean;
  error?: string;
  assetsData: AssetsData[];
  isInited: boolean;
}
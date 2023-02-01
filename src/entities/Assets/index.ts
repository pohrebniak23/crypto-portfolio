import {
  getAssetsData,
  getAssetsDataInited,
  getIsAssetsLoading,
} from './model/selectors/getPortfolioData';
import { fetchAssetsData } from './model/services/fetchAssetsData';
import { AssetsReducer } from './model/slices/AssetsSlice';
import { AssetsData, AssetsSchema } from './model/types/AssetsSchema';
import { Assets } from './ui/Assets';
import { AssetsInfo } from './ui/AssetsInfo/AssetsInfo';

export {
  AssetsReducer,
  getAssetsDataInited,
  getAssetsData,
  Assets,
  fetchAssetsData,
  AssetsInfo,
  getIsAssetsLoading,
};
export type { AssetsSchema, AssetsData };

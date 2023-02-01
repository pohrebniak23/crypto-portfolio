import { StateSchema } from 'app/providers/StoreProvider';

export const getAssetsData = (state: StateSchema) =>
  state.assets.assetsData;

export const getAssetsDataInited = (state: StateSchema) =>
  state.assets.isInited;

export const getIsAssetsLoading = (state: StateSchema) =>
state.assets.isLoading;
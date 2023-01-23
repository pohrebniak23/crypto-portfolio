import { StateSchema, ThunkConfig } from './config/StateSchema';
import { AppDispatch, RootState, createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export { StoreProvider, createReduxStore };
export type { StateSchema, AppDispatch, RootState, ThunkConfig };

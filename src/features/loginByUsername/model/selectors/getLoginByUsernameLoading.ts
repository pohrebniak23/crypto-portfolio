import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginByUsernameLoading = (state: StateSchema) =>
  state.loginByUsername.isLoading;

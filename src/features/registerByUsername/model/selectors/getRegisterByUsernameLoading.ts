import { StateSchema } from 'app/providers/StoreProvider';

export const getRegisterByUsernameLoading = (state: StateSchema) =>
  state.registerByUsername.isLoading;

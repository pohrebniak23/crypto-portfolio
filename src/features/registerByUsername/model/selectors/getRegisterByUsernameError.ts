import { StateSchema } from 'app/providers/StoreProvider';

export const getRegisterByUsernameError = (state: StateSchema) =>
  state.registerByUsername.error;

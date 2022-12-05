import { StateSchema } from "app/providers/StoreProvider";

export const getLoginByUsernameError = (state: StateSchema) =>
  state.loginByUsername.error;

import { UserSchema } from 'entity/User';
import { NavigateOptions, To } from 'react-router-dom';
import { PortfolioState } from 'redux/reducers/Portfolio/PortfolioSlice';
import { LoginByUsernameSchema } from 'features/loginByUsername/model/types/loginByUsernameSchema';
import { RegisterByUsernameSchema } from 'features/registerByUsername';

export interface StateSchema {
  loginByUsername: LoginByUsernameSchema;
  registerByUsername: RegisterByUsernameSchema;
  portfolio: PortfolioState;
  user: UserSchema;
  coinsAPI: any;
}

export interface ThunkExtraArg {
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}

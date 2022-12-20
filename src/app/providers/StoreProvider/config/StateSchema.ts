import { UserSchema } from 'entities/User';
import { LoginByUsernameSchema } from 'features/loginByUsername/model/types/loginByUsernameSchema';
import { RegisterByUsernameSchema } from 'features/registerByUsername';
import { PortfolioState } from 'redux/reducers/Portfolio/PortfolioSlice';

export interface StateSchema {
  loginByUsername: LoginByUsernameSchema;
  registerByUsername: RegisterByUsernameSchema;
  portfolio: PortfolioState;
  user: UserSchema;
  coinsAPI: any;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}

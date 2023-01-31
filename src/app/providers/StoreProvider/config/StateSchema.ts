import { AssetsSchema } from 'entities/Assets/model/types/AssetsSchema';
import { coinsAPI } from 'entities/Coin';
import { TransactionsSchema } from 'entities/Transactions';
import { UserSchema } from 'entities/User';
import { AddNewTransactionSchema } from 'features/AddNewTransaction';
import { LoginByUsernameSchema } from 'features/loginByUsername/model/types/loginByUsernameSchema';
import { RegisterByUsernameSchema } from 'features/registerByUsername';

export interface StateSchema {
  loginByUsername: LoginByUsernameSchema;
  registerByUsername: RegisterByUsernameSchema;
  assets: AssetsSchema;
  transactions: TransactionsSchema;
  addNewTransaction: AddNewTransactionSchema;
  user: UserSchema;
  coinsAPI: ReturnType<typeof coinsAPI.reducer>;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}

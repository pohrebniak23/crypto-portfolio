import { UserActions, UserReducer } from './model/slices/UserSlice';
import { UserSchema, User } from './model/types/UserSchema';
import { getUserData } from './model/selectors/getUserData';

export { UserReducer, UserActions, getUserData };

export type { UserSchema, User };

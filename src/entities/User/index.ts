import { UserActions, UserReducer } from './model/slices/UserSlice';
import { UserSchema, User } from './model/types/UserSchema';
import { getUserData } from './model/selectors/getUserData';
import { getUserInited } from './model/selectors/getUserInited';

export { UserReducer, UserActions, getUserData, getUserInited };

export type { UserSchema, User };

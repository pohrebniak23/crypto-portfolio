export interface User {
  id: string;
  name: string;
  username: string;
  password: number;
}

export interface UserSchema {
  userData?: User;
  inited: boolean;
}
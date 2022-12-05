export interface RegisterByUsernameData {
  username: string;
  password: string;
  name: string;
}

export interface RegisterByUsernameSchema {
  isLoading: boolean;
  error?: string;
}

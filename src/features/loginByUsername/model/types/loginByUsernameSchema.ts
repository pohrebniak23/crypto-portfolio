export interface LoginByUsernameData {
  password: string;
  username: string;
}

export interface LoginByUsernameSchema {
  isLoading: boolean;
  error?: string;
}

export type RegisterCredentials = {
  username: string;
  password: string;
  confirmPassword: string;
  role: 'ADMIN' | 'USER';
};

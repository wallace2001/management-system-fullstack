export type Profile = {
  id: string;
  username: string;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
};

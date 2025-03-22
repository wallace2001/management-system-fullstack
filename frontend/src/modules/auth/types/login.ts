export type LoginResponse = JwtTokens & {
  userId: string;
};

export type Credentials = {
  username: string;
  password: string;
};

export type JwtTokens = {
  access_token: string;
};

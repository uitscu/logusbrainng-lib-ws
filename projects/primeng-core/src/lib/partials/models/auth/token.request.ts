export interface TokenRequest {
  username?: string;
  password?: string;
}

export interface RefreshTokenRequest {
  token?: string;
  refreshToken?: string;
}

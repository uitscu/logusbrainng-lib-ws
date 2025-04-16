export interface TokenResponse {
  token?: string
  refreshToken?: string
  refreshTokenExpiryTime?: Date | null
  isVerified?: boolean
}

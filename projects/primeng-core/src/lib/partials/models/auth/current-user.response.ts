export interface CurrentUserResponse {
  id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  emailConfirmed?: boolean;
  phoneNumber?: string;
  profilePictureDataUrl?: string;
}

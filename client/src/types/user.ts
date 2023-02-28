export type TUser = {
  name: string;
  userName: string;
  givenName: string;
  middleName: string;
  familyName: string;
  email: string;
  emailVerified: Boolean;
  profileImgUrl: string;
  token: string;
  spotifyToken: string;
  spotifyRefreshToken: string;
  appleToken: string;
};

export type TUserWrapper = {
  user: TUser;
  existingAccount: boolean;
};
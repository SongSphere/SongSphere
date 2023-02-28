export type TUser = {
  name: string;
  givenName: string;
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

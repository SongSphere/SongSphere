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
  following: Array<String>;
  followers: Array<String>;
};

export type TUserWrapper = {
  user: TUser;
  existingAccount: boolean;
};

export type TUser = {
  name: string;
  username: string;
  givenName: string;
  middleName: string;
  familyName: string;
  email: string;
  emailVerified: Boolean;
  profileImgUrl: string;
  backgroundImgUrl: string;
  token: string;
  spotifyToken: string;
  spotifyRefreshToken: string;
  appleToken: string;
  following: string[];
  followers: string[];
  onboarded: Boolean;
  isPrivate: Boolean;
  likes: string[];
  defaultPlatform: string;
};

export type TUserWrapper = {
  user: TUser;
  existingAccount: boolean;
};

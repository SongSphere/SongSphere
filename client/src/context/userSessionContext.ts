import { createContext } from "react";

export type TUserWrapper = {
  user: TUser;
  existingAccount: boolean;
};

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

export interface IUserSessionContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
  user: TUser | null;
  setUser: Function;
  existingAccount: boolean;
  setExistingAccount: Function;
}

export const userSessionContext = createContext<IUserSessionContext>({
  isLoggedIn: false,
  setIsLoggedIn: (isloggedin: boolean) => {},
  user: null,
  setUser: (user: TUser | null) => {},
  existingAccount: true,
  setExistingAccount: (existingAccount: boolean) => {},
});

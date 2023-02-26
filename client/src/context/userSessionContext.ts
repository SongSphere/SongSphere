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

export interface userSessionContext {
  isLoggedIn: boolean;
  user: TUser | null;
  setIsLoggedIn: Function;
  setUser: Function;
  existingAccount: boolean;
  setExistingAccount: Function;
}

export const userSessionContext = createContext<userSessionContext>({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: (isloggedin: boolean) => {},
  setUser: (user: TUser) => {},
  existingAccount: true,
  setExistingAccount: (existingAccount: boolean) => {},
});

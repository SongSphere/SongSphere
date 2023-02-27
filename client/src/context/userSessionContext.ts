import { createContext } from "react";

export type TUserWrapper = {
  user: TUser;
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
}

export const userSessionContext = createContext<IUserSessionContext>({
  isLoggedIn: false,
  setIsLoggedIn: (isloggedin: boolean) => {},
  user: null,
  setUser: (user: TUser | null) => {},
});

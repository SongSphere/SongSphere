import { createContext } from "react";

export interface IisLoggedInContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
}

export const isLoggedInContext = createContext<IisLoggedInContext>({
  isLoggedIn: false,
  setIsLoggedIn: (isloggedin: boolean) => {},
});

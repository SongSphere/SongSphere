import { createContext } from "react"

export interface IisLoggedInContext {
    isloggedin: boolean,
    setIsLoggedIn: Function
}

export const isLoggedInContext = createContext<IisLoggedInContext>({
    isloggedin: false,
    setIsLoggedIn: () => {}
})
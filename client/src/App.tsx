import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./components/router";
import { useEffect, useState } from "react";
import { userSessionContext, TUser } from "./context/userSessionContext";
import checkLoggedIn from "./services/check-logged-in";
import fetchUser from "./services/fetch-user";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const sessionUpdate = async () => {
      try {
        setIsLoggedIn(await checkLoggedIn());
      } catch (error) {
        console.error(error);
      }

      try {
        setUser(await fetchUser());
      } catch (error) {
        console.error(error);
      }
    };
    sessionUpdate();
  }, []);

  return (
    <>
      <userSessionContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
        }}
      >
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
        >
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </userSessionContext.Provider>
    </>
  );
};

export default App;

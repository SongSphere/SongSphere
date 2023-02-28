import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./components/router";
import { useEffect, useState } from "react";
import { userSessionContext, TUser } from "./context/userSessionContext";
import checkLoggedIn from "./services/check-logged-in";
import fetchUser from "./services/fetch-user";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [existingAccount, setExistingAccount] = useState<boolean>(true);

  let navigate = useNavigate();

  useEffect(() => {
    const sessionUpdate = async () => {
      try {
        setIsLoggedIn(await checkLoggedIn());

        /*
            user does exist in the DB
            Spotify token exists or Apple token exists. 
            User must have one or the other
            Then go to the home page
          */

        if (
          existingAccount &&
          (user?.appleToken != null || user?.spotifyToken != null)
        ) {
          navigate("/");
        } else {
          // user doesn't exist in the DB, then go to onboarding page
          navigate("/onboard");
        }
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
          existingAccount,
          setExistingAccount,
        }}
      >
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
        >
          <Router />
        </GoogleOAuthProvider>
      </userSessionContext.Provider>
    </>
  );
};

export default App;
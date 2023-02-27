import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./components/router";
import { useEffect, useState } from "react";
import { userSessionContext, TUser } from "./context/userSessionContext";
import checkLoggedIn from "./services/check-logged-in";
import fetchUser from "./services/fetch-user";
import AuthPage from "./pages/auth-page";
import OnBoardPage from "./pages/onboard-page";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);

  const [existingAccount, setExistingAccount] = useState<boolean>(true);
  const [sessionUpdated, setSessionUpdated] = useState<boolean>(false);

  let navigate = useNavigate();

  useEffect(() => {
    const sessionUpdate = async () => {
      try {
        await setUser(await fetchUser());
      } catch (error) {
        console.error(error);
      }

      try {
        setIsLoggedIn(await checkLoggedIn());
      } catch (error) {
        console.error(error);
      }
    };
    sessionUpdate().then(() => {
      setSessionUpdated(true);
    });
  }, []);

  if (sessionUpdated) {
    if (user) {
      if (
        !existingAccount ||
        (user.appleToken == null && user.spotifyToken == null)
      ) {
        return <OnBoardPage />;
      }
    } else {
      return <AuthPage />;
    }
  }

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
        <Router user={user} />
      </userSessionContext.Provider>
    </>
  );
};

export default App;

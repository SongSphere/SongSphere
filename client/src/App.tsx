import Router from "./components/router";
import { useEffect, useState } from "react";
import { userSessionContext, TUser } from "./context/userSessionContext";
import checkLoggedIn from "./services/check-logged-in";
import fetchUser from "./services/fetch-user";
import AuthPage from "./pages/auth-page";
import OnBoardPage from "./pages/onboard-page";
import HomePage from "./pages/home-page";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [musicInstance, setMusicInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);
  const [user, setUser] = useState<TUser | null>(null);

  const [existingAccount, setExistingAccount] = useState<boolean>(true);
  const [sessionUpdated, setSessionUpdated] = useState<boolean>(false);

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

    // Dynamically loaded Apple Musickit
    const script = document.createElement("script");
    script.src = "https://js-cdn.music.apple.com/musickit/v1/musickit.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      MusicKit.configure({
        developerToken: process.env.REACT_APP_APPLE_TOKEN,
        app: {
          name: "SongSphere",
          build: "1978.4.1",
        },
      });
      setMusicInstance(MusicKit.getInstance());
      sessionUpdate().then(() => {
        setSessionUpdated(true);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!musicInstance) {
    return <div>rendering music instance</div>;
  }

  if (sessionUpdated) {
    if (user && isLoggedIn) {
      if (
        !existingAccount ||
        (user.appleToken == null && user.spotifyToken == null)
      ) {
        return <OnBoardPage musicInstance={musicInstance} />;
      } else {
        return <HomePage musicInstance={musicInstance} />;
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
        <Router musicInstance={musicInstance} />
      </userSessionContext.Provider>
    </>
  );
};

export default App;

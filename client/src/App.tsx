import Router from "./components/router";
import { useEffect, useState } from "react";
import { userSessionContext, TUser } from "./context/userSessionContext";
import checkLoggedIn from "./services/check-logged-in";
import fetchUser from "./services/fetch-user";
import AuthPage from "./pages/auth-page";
import OnBoardPage from "./pages/onboard-page";
import { spotifySetup } from "./services/spotify-sdk-setup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [musicInstance, setMusicInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);
  const [user, setUser] = useState<TUser | null>(null);

  const [existingAccount, setExistingAccount] = useState<boolean>(true);
  const [sessionUpdated, setSessionUpdated] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  useEffect(() => {
    const updateSession = async () => {
      try {
        await checkLoggedIn().then(async (isLoggedIn) => {
          setIsLoggedIn(isLoggedIn);
          if (isLoggedIn) {
            await fetchUser().then((userData) => {
              setUser(userData);
            });
          }
          setSessionUpdated(true);
        });
      } catch (error) {
        console.error(error);
      }
    };

    // dynamically import Musickit
    const appleMusicScript = document.createElement("script");
    appleMusicScript.src =
      "https://js-cdn.music.apple.com/musickit/v1/musickit.js";
    appleMusicScript.async = true;
    document.body.appendChild(appleMusicScript);

    appleMusicScript.onload = () => {
      MusicKit.configure({
        developerToken: process.env.REACT_APP_APPLE_TOKEN,
        app: {
          name: "SongSphere",
          build: "1978.4.1",
        },
      });
      setMusicInstance(MusicKit.getInstance());
    };

    updateSession();

    return () => {
      document.body.removeChild(appleMusicScript);
    };
  }, []);

  useEffect(() => {
    if (user) {
      if (user.spotifyToken && !player) {
        // TODO: if the user doesn't have spotify premium it will return 403
        spotifySetup(user.spotifyToken, setPlayer);
      }
    }
  }, [user]);

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
        <Router musicInstance={musicInstance} />;
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

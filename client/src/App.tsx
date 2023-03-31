import Router from "./routes/router";
import { useEffect, useState } from "react";
import checkLoggedIn from "./services/user/check-logged-in";
import fetchUser from "./services/user/fetch-user";
import AuthPage from "./pages/auth-page";
import OnBoardPage from "./pages/onboard-page";
import { TUser } from "./types/user";
import Session from "./session";

const App = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [sessionUpdated, setSessionUpdated] = useState<boolean>(false);

  const [AMInstance, setAMInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);

  useEffect(() => {
    const updateSession = async () => {
      try {
        await checkLoggedIn().then(async (isLoggedIn) => {
          Session.setIsLoggedIn(isLoggedIn);
          if (isLoggedIn) {
            await fetchUser().then((userData) => {
              if (userData) {
                Session.setUser(userData);
                setUser(Session.getUser());
                Session.setMusicService(userData.defaultPlatform);
                setSessionUpdated(true);
              }
            });
          } else {
            setSessionUpdated(true);
          }
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
      Session.setAMInstance(MusicKit.getInstance());
      setAMInstance(MusicKit.getInstance());
    };

    updateSession();

    return () => {
      document.body.removeChild(appleMusicScript);
    };
  }, []);

  if (!AMInstance) {
    return <div>rendering apple music instance</div>;
  }

  if (sessionUpdated) {
    if (user && Session.getIsLoggedIn()) {
      if (!user.onboarded) {
        return <OnBoardPage />;
      } else {
        return <Router />;
      }
    } else {
      return <AuthPage />;
    }
  }

  return (
    <>
      <div>loading</div>
    </>
  );
};

export default App;

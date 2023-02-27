import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./components/router";
import { useEffect, useState } from "react";
import { userSessionContext, TUser } from "./context/userSessionContext";
import checkLoggedIn from "./services/check-logged-in";
import fetchUser from "./services/fetch-user";
import { appleMusicContext } from "./context/appleMusicContext";
import { appleMusicConfigure } from "./services/apple-music-link";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [musicInstance, setMusicInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);

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

    const initAppleMusic = async () => {
      try {
        setMusicInstance(await appleMusicConfigure());
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
      initAppleMusic();
      sessionUpdate();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <appleMusicContext.Provider value={{ musicInstance, setMusicInstance }}>
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
      </appleMusicContext.Provider>
    </>
  );
};

export default App;

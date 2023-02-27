import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./components/router";
import { useEffect, useState } from "react";
import { userSessionContext, TUser } from "./context/userSessionContext";
import checkLoggedIn from "./services/check-logged-in";
import fetchUser from "./services/fetch-user";
// import { appleMusicContext } from "./context/appleMusicContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [musicInstance, setMusicInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);
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

    // const initAppleMusic = async () => {
    //   try {
    //     setMusicInstance(await appleMusicConfigure());
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

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
      sessionUpdate();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!musicInstance) {
    return <div>rendering music instance</div>;
  }

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
            <Router musicInstance={musicInstance} />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </userSessionContext.Provider>
    </>
  );
};

export default App;

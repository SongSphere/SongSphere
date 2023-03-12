import Router from "./routes/router";
import { useEffect, useState } from "react";
import checkLoggedIn from "./services/check-logged-in";
import fetchUser from "./services/user/fetch-user";
import AuthPage from "./pages/auth-page";
import OnBoardPage from "./pages/onboard-page";
import { TUser } from "./types/user";
import { TPost } from "./types/post";
import React from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [sessionUpdated, setSessionUpdated] = useState<boolean>(false);
  const [service, setService] = useState("");
  const [post, editPost] = useState<TPost | null>(null);
  const [selectEditPost, setSelectEditPost] = useState<TPost | null>(null);

  const [appleMusicInstance, setAppleMusicInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);

  useEffect(() => {
    const updateSession = async () => {
      try {
        await checkLoggedIn().then(async (isLoggedIn) => {
          setIsLoggedIn(isLoggedIn);
          if (isLoggedIn) {
            await fetchUser().then((userData) => {
              setUser(userData);

              // set user's music service
              if (userData) {
                if (
                  userData.spotifyToken != undefined &&
                  userData.appleToken != undefined
                ) {
                  setService("both");
                }
                if (userData.spotifyToken != undefined) {
                  setService("spotify");
                } else if (userData.appleToken != undefined) {
                  setService("apple");
                }
              }
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
      setAppleMusicInstance(MusicKit.getInstance());
    };

    updateSession();

    return () => {
      document.body.removeChild(appleMusicScript);
    };
  }, []);

  if (!appleMusicInstance) {
    return <div>rendering apple music instance</div>;
  }

  if (sessionUpdated) {
    if (user && isLoggedIn) {
      if (!user.onboarded) {
        return (
          <OnBoardPage
            user={user}
            setUser={setUser}
            appleMusicInstance={appleMusicInstance}
          />
        );
      } else {
        return (
          <Router
            user={user}
            setUser={setUser}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setIsLoggedIn={setIsLoggedIn}
            appleMusicInstance={appleMusicInstance}
            service={service}
            post={post}
            setSelectEditPost={setSelectEditPost}
            selectEditPost={selectEditPost}
          />
        );
      }
    } else {
      return <AuthPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;
    }
  }

  return (
    <>
      <Router
        user={user}
        setUser={setUser}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setIsLoggedIn={setIsLoggedIn}
        appleMusicInstance={appleMusicInstance}
        service={service}
        post={post}
        setSelectEditPost={setSelectEditPost}
        selectEditPost={selectEditPost}
      />
    </>
  );
};

export default App;

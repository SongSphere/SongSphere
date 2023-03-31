import fetchUser from "../../services/user/fetch-user";
import { appleAuth } from "../../services/user/apple-music-link";
import Session from "../../session";
import { TUser } from "../../types/user";
import React, { useEffect, useState } from "react";
import {
  setDefaultPlatform,
  getDefaultPlatform,
} from "../../services/user/default-platform";

const DefaultPlatform = () => {
  let [user, setUser] = useState<TUser | null>(null);
  let [currService, setCurrService] = useState<string>();
  let [service, setService] = useState<string[]>([]);

  useEffect(() => {
    setUser(Session.getUser());
    checkService();
    if (user) {
      setCurrService(user.defaultPlatform);

      // If a user unlinks their default platform
      if (user.spotifyToken == undefined || user.spotifyToken.length == 0) {
        if (currService == "spotify") {
          setCurrService("apple");
          setDefaultPlatform("apple");
          Session.setMusicService("apple");
          user.defaultPlatform = "apple";
        }
      }
      if (user.appleToken == undefined || user.appleToken.length == 0) {
        if (currService == "apple") {
          setCurrService("spotify");
          setDefaultPlatform("spotify");
          Session.setMusicService("spotify");
          user.defaultPlatform = "spotify";
        }
      }
    }
  }, [user, Session.getUser()]);

  // this sucks but works
  const checkService = () => {
    if (user) {
      let s = false;
      if (user.spotifyToken != undefined && user.spotifyToken.length != 0) {
        setService(["spotify"]);
        s = true;
      }
      if (user.appleToken != undefined && user.appleToken.length != 0) {
        if (s) {
          setService(["spotify", "apple"]);
        } else {
          setService(["apple"]);
        }
      }
    }
  };

  if (user == null) {
    return <div>"fetching user"</div>;
  }

  return (
    <div>
      <div>Current Service: {currService}</div>
      Select Service
      {service.map((s) => {
        if (s == currService) {
          return (
            <button
              className="w-11/12 text-black bg-red-300 border-2 border-solid w-1/2text-center border-lblue hover:text-lgrey"
              key={s}
              onClick={() => {
                Session.setMusicService(s);
                setDefaultPlatform(s);
                setCurrService(s);
                if (user) {
                  user.defaultPlatform = s;
                }
              }}
            >
              {s}
            </button>
          );
        } else {
          return (
            <button
              className="w-11/12 text-black bg-white border-2 border-solid w-1/2text-center border-lblue hover:text-lgrey"
              key={s}
              onClick={() => {
                Session.setMusicService(s);
                setDefaultPlatform(s);
                setCurrService(s);
                if (user) {
                  user.defaultPlatform = s;
                }
              }}
            >
              {s}
            </button>
          );
        }
      })}
    </div>
  );
};

export default DefaultPlatform;

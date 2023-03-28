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
  //let platform = Session.getMusicService();
  let [user, setUser] = useState<TUser | null>(null);
  let [currService, setCurrService] = useState<string>("");
  let [service, setService] = useState<string[]>([]);
  //let options = [];
  useEffect(() => {
    setUser(Session.getUser());
    console.log(user);
    checkService();
    getPlatform();
    if (user) {
      console.log("ayo");
      console.log(Session.getMusicService());
      //setCurrService(Session.getMusicService());
    }
    console.log(service);
  }, [user]);

  const getPlatform = async () => {
    setCurrService(await getDefaultPlatform());
  };

  const checkService = () => {
    if (user) {
      let a = false;
      let s = false;
      if (user.spotifyToken != undefined && user.spotifyToken.length != 0) {
        s = true;
      }
      if (user.appleToken != undefined && user.appleToken.length != 0) {
        a = true;
      }
      if (a && !s) {
        setService(["apple"]);
      } else if (a && s) {
        setService(["spotify", "apple"]);
      } else {
        setService(["spotify"]);
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
      {service.map((s) => (
        <div>
          <button
            className="w-11/12 text-black bg-white border-2 border-solid w-1/2text-center border-lblue hover:text-lgrey focus:bg-navy focus:text-lgrey"
            key={s}
            onClick={() => {
              Session.setMusicService(s);
              //user.defaultPlatform = s;
              setCurrService(s);
            }}
          >
            {s}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DefaultPlatform;

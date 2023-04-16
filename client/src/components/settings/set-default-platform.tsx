import Session from "../../session";
import { TUser } from "../../types/user";
import { useEffect, useState } from "react";
import { setDefaultPlatform } from "../../services/user/default-platform";

interface IDefaultPlatformProps {
  appleAccountStatus: boolean;
  spotifyAccountStatus: boolean;
  defaultPlatform: string;
}

const DefaultPlatform = (props: IDefaultPlatformProps) => {
  let [currService, setCurrService] = useState<string>();
  let [service, setService] = useState<string[]>([]);

  useEffect(() => {
    setCurrService(props.defaultPlatform);
    let tempService: string[] = [];
    if (props.appleAccountStatus) {
      tempService.push("apple");
    }
    if (props.spotifyAccountStatus) {
      tempService.push("spotify");
    }
    setService(tempService);
  }, [props.appleAccountStatus, props.spotifyAccountStatus]);

  return (
    <div className="">
      <div className="font-semibold">Default Service:</div>
      {service.map((s) => {
        if (s == currService) {
          return (
            <button
              className="px-2 py-1 mr-2 text-center text-black rounded-lg bg-sky-300 drop-shadow-lg"
              key={s}
              onClick={() => {
                Session.setMusicService(s);
                setDefaultPlatform(s);
                setCurrService(s);
              }}
            >
              {s}
            </button>
          );
        } else {
          return (
            <button
              className="px-2 py-1 mr-2 text-center text-black rounded-lg bg-slate-100 drop-shadow-lg"
              key={s}
              onClick={() => {
                Session.setMusicService(s);
                setDefaultPlatform(s);
                setCurrService(s);
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

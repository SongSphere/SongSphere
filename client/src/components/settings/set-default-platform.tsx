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

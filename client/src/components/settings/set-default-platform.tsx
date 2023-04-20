import Session from "../../session";
import { useEffect, useRef, useState } from "react";
import { setDefaultPlatform } from "../../services/user/default-platform";
import fetchUser from "../../services/user/fetch-user";

const buttonActiveStyle =
  "px-2 py-1 mr-2 text-center text-black rounded-lg drop-shadow-lg bg-sky-300";

const buttonStyle =
  "px-2 py-1 mr-2 text-center text-black rounded-lg drop-shadow-lg bg-slate-300";

interface IDefaultPlatformProps {
  appleAccountStatus: boolean;
  spotifyAccountStatus: boolean;
  defaultPlatform: string;
}

const DefaultPlatform = (props: IDefaultPlatformProps) => {
  let [appleIsDefault, setAppleIsDefault] = useState(false);
  let [spotifyIsDefault, setSpotifyIsDefault] = useState(false);

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (props.defaultPlatform == "apple") {
      setAppleIsDefault(true);
      setSpotifyIsDefault(false);
    } else if (props.defaultPlatform == "spotify") {
      setSpotifyIsDefault(true);
      setAppleIsDefault(false);
    }

    if (!props.appleAccountStatus) {
      setAppleIsDefault(false);
      if (props.spotifyAccountStatus) {
        setDefaultPlatform("spotify");
        setSpotifyIsDefault(true);
      } else {
        setDefaultPlatform("");
      }
    } else if (!props.spotifyAccountStatus) {
      setSpotifyIsDefault(false);
      if (props.appleAccountStatus) {
        setDefaultPlatform("apple");
        setAppleIsDefault(true);
      } else {
        setDefaultPlatform("");
      }
    }
  }, [props.appleAccountStatus, props.spotifyAccountStatus]);

  return (
    <div className="">
      <div className="font-semibold">Default Service:</div>
      {props.spotifyAccountStatus && (
        <button
          className={spotifyIsDefault ? buttonActiveStyle : buttonStyle}
          onClick={async () => {
            Session.setMusicService("spotify");
            await setDefaultPlatform("spotify");
            setAppleIsDefault(false);
            setSpotifyIsDefault(true);
            await Session.setUser(await fetchUser());
          }}
        >
          Spotify
        </button>
      )}

      {props.appleAccountStatus && (
        <button
          className={appleIsDefault ? buttonActiveStyle : buttonStyle}
          onClick={async () => {
            Session.setMusicService("apple");
            await setDefaultPlatform("apple");
            setAppleIsDefault(true);
            setSpotifyIsDefault(false);
            await Session.setUser(await fetchUser());
          }}
        >
          Apple Music
        </button>
      )}
    </div>
  );
};

export default DefaultPlatform;

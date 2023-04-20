import Session from "../../session";
import { useEffect, useRef, useState } from "react";
import { setDefaultPlatform } from "../../services/user/default-platform";

const buttonActiveStyle =
  "px-2 py-1 mr-2 text-center text-black rounded-lg drop-shadow-lg bg-sky-300";

const buttonStyle =
  "px-2 py-1 mr-2 text-center text-black rounded-lg drop-shadow-lg bg-slate-300";

interface IDefaultPlatformProps {
  defaultPlatform: string;
}

const DefaultPlatform = (props: IDefaultPlatformProps) => {
  // let [currService, setCurrService] = useState<string>();
  // let [service, setService] = useState<string[]>([]);
  let [appleIsDefault, setAppleIsDefault] = useState(false);
  let [spotifyIsDefault, setSpotifyIsDefault] = useState(false);

  const ref = useRef<HTMLElement | null>(null);

  const switchHandler = async (s: string) => {
    const span = ref.current;
    if (span) {
      span.className += "bg-sky-300";
    }
    Session.setMusicService(s);
    await setDefaultPlatform(s);
  };

  useEffect(() => {
    if (props.defaultPlatform == "apple") {
      setAppleIsDefault(true);
    } else if (props.defaultPlatform == "spotify") {
      setSpotifyIsDefault(true);
    }
  }, []);

  return (
    <div className="">
      <div className="font-semibold">Default Service:</div>
      <button
        className={spotifyIsDefault ? buttonActiveStyle : buttonStyle}
        onClick={async () => {
          Session.setMusicService("spotify");
          await setDefaultPlatform("spotify");
          setAppleIsDefault(false);
          setSpotifyIsDefault(true);
        }}
      >
        Spotify
      </button>

      <button
        className={appleIsDefault ? buttonActiveStyle : buttonStyle}
        onClick={async () => {
          Session.setMusicService("apple");
          await setDefaultPlatform("apple");
          setAppleIsDefault(true);
          setSpotifyIsDefault(false);
        }}
      >
        Apple Music
      </button>
    </div>
  );
};

export default DefaultPlatform;

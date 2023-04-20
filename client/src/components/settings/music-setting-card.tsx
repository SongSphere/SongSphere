import { useEffect, useState } from "react";
import {
  requestSpotifyAuthorization,
  spotifyAuth,
} from "../../services/spotify/spotify-link";
import { appleAuth } from "../../services/user/apple-music-link";
import fetchUser from "../../services/user/fetch-user";
import unlinkMusic from "../../services/user/unlink-music";
import Session from "../../session";
import { TUser } from "../../types/user";
import DefaultPlatform from "./set-default-platform";

interface IMusicSettingCardProps {
  user: TUser;
}

const SpotifyLinkButton = () => {
  const [calledSpotifyAuth, setCalledSpotifyAuth] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    const codePrefixString = "?code=";

    const spotifyAuthHandler = async () => {
      if (url.includes(codePrefixString)) {
        const uriString = window.location.search;
        const urlParameters = new URLSearchParams(uriString);
        const code = urlParameters.get("code");

        if (code && !calledSpotifyAuth) {
          setCalledSpotifyAuth(true);
          try {
            spotifyAuth(code).then(async () => {
              Session.setUser(await fetchUser());
              window.location.reload();
            });
          } catch (error) {
            console.error(error);
          }
        }
      }
    };

    spotifyAuthHandler();
  }, []);

  return (
    <div>
      <button
        onClick={() => requestSpotifyAuthorization()}
        className="px-2 py-1 bg-green-300 rounded-lg drop-shadow-lg"
      >
        Link Spotify
      </button>
    </div>
  );
};

const MusicSettingCard = (props: IMusicSettingCardProps) => {
  const [appleAccountStatus, setAppleAccountStatus] = useState<boolean>(false);
  const [spotifyAccountStatus, setSpotifyAccountStatus] =
    useState<boolean>(false);
  const [AMInstance, setAMInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);

  useEffect(() => {
    setAMInstance(Session.getAMInstance());

    if (props.user.appleToken != undefined) {
      setAppleAccountStatus(true);
    } else {
      setAppleAccountStatus(false);
    }
    if (props.user.spotifyToken != undefined) {
      setSpotifyAccountStatus(true);
    } else {
      setSpotifyAccountStatus(false);
    }
  }, []);

  let appleLink;
  let spotifyLink;

  if (appleAccountStatus) {
    appleLink = (
      <button
        className="px-2 py-1 bg-red-400 rounded-lg drop-shadow-lg"
        onClick={async () => {
          await unlinkMusic("apple").then(async () => {
            setAppleAccountStatus(false);
          });
        }}
      >
        Unlink Apple Music
      </button>
    );
  } else {
    appleLink = (
      <button
        className="px-2 py-1 bg-red-400 rounded-lg drop-shadow-lg"
        onClick={async () => {
          try {
            await appleAuth(AMInstance!);
            setAppleAccountStatus(true);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Link Apple Music
      </button>
    );
  }

  if (spotifyAccountStatus) {
    spotifyLink = (
      <button
        className="px-2 py-1 bg-green-300 rounded-lg drop-shadow-lg"
        onClick={async () => {
          await unlinkMusic("spotify").then(async () => {
            setSpotifyAccountStatus(false);
          });
        }}
      >
        Unlink Spotify Music
      </button>
    );
  } else {
    spotifyLink = <SpotifyLinkButton />;
  }

  if (!AMInstance) {
    return <div>fetching Apple Music Instance</div>;
  }

  return (
    <div className="w-full h-full p-4">
      <div className="bg-white rounded-lg">
        <h3 className="pt-10 text-3xl font-semibold text-center">
          Music Settings
        </h3>
        <div className="flex justify-center p-4 pb-10">
          <div className="">
            <div className="pr-2 font-semibold">Apple Music: </div>
            {appleLink}
            <div className="pr-2 font-semibold">Spotfiy: </div>
            {spotifyLink}
            <DefaultPlatform defaultPlatform={props.user.defaultPlatform} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicSettingCard;
function setUser(arg0: import("../../types/user").TUser | null) {
  throw new Error("Function not implemented.");
}

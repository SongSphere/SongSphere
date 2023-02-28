import { useContext, useEffect, useState } from "react";
import { TUser } from "../types/user";

interface ISpotifySong {
  name: string;
  album: {
    images: [{ url: string }];
  };
  artists: [{ name: string }];
  uri: string;
}

interface ISpotifyPlayerCardProps {
  user: TUser | null;
}

const SpotifyPlayerCard = (props: ISpotifyPlayerCardProps) => {
  const songId = "11dFghVXANMlKmJXsNCbNl";

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [song, setSong] = useState<ISpotifySong | null>(null);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const playSong = async (song_uri: string, deviceId: string) => {
      const url =
        "https://api.spotify.com/v1/me/player/play?" +
        new URLSearchParams({ device_id: deviceId });
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user?.spotifyToken}`,
        },
        body: JSON.stringify({
          context_uri: song_uri,
          offset: {
            position: 5,
          },
          position_ms: 0,
        }),
      });
    };

    if (deviceId) {
      const song_uri = "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr";
      playSong(song_uri, deviceId);
    }
  }, [deviceId]);

  useEffect(() => {
    if (props.user) {
      // dynamically import Spotify
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(props.user?.spotifyToken || "");
          },
          volume: 0.5,
        });

        setPlayer(player);
        player.addListener("ready", async ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          setDeviceId(device_id);
        });
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.connect().then(async (success) => {
          if (success) {
            console.log("spotify player connected");
          }
        });
      };
    }
  }, [props.user]);

  const playMusicHandler = () => {
    setIsPlaying(!isPlaying);

    if (player) {
      if (!isPlaying) {
        player.resume();
      } else {
        player.pause();
      }
    } else {
      console.error("music not instantiated");
    }
  };

  return (
    <div className="relative flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6">
          <div className="flex justify-center">
            <div className="w-4/5 mt-5">
              {/* <img
                src={
                  song
                    ? song.attributes.artwork.url
                        .replace("{w}", 1000)
                        .replace("{h}", 1000)
                    : ""
                }
              ></img> */}
            </div>
          </div>
          <div className="px-6 mt-2 text-2xl text-center">
            {/* {song?.attributes.name} */}
          </div>
          <div className="flex justify-center mt-2">
            <div
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                playMusicHandler();
              }}
            >
              <img
                src={
                  isPlaying
                    ? "/img/icons/pause-icon.png"
                    : "/img/icons/play-icon.png"
                }
              ></img>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-5/6 h-1 bg-neutral-200 dark:bg-neutral-600">
              <div
                className={`h-1 bg-red-400`}
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SpotifyPlayerCard;

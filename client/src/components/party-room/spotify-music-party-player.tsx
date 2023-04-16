import { useEffect, useState } from "react";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";
import selectService from "../../services/user/select-service";
import Session from "../../session";
import setActivity from "../../services/general/set-activity";
import { spotifyRefresh } from "../../services/spotify/spotify-refresh";

interface ISpotifySong {
  name: string;
  img: string;
  artists: [{ name: string }];
  uri: string;
}

interface ISpotifyPlayerCardProps {
  playNext: Function;
  selectedSong: TMusicContent | null;
}

const SpotifyPartyRoomPlayerCard = (props: ISpotifyPlayerCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState<ISpotifySong | null>(null);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [AMInstance, setAMInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
    setAMInstance(Session.getAMInstance());
  }, [Session.getUser()]);

  const playMusicHandler = () => {
    setIsPlaying(!isPlaying);

    if (player) {
      if (!isPlaying) {
        player.resume();
        if (props.selectedSong) {
          setActivity(props.selectedSong);
        }
      } else {
        player.pause();
        if (props.selectedSong) {
          setActivity(null);
        }
      }
    } else {
      console.error("music not instantiated");
    }
  };

  const fetchSong = async (songId: string, token: string) => {
    await spotifyRefresh();

    await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const song: ISpotifySong = {
          name: data.name,
          img: data.album.images[0].url,
          artists: data.album.artists.map((artist: any) => {
            return artist.name;
          }),
          uri: data.uri,
        };
        setSong(song);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log("usefeect fired");
    const selectServiceHandler = async (
      selectedSong: TMusicContent,
      appleMusicInstance: MusicKit.MusicKitInstance,
      user: TUser,
      service: string,
      token: string
    ) => {
      await selectService(selectedSong, appleMusicInstance, user, service).then(
        (bestFitId) => {
          if (bestFitId != "-1") {
            fetchSong(bestFitId, token);
          }
        }
      );
    };

    if (user && props.selectedSong && AMInstance) {
      selectServiceHandler(
        props.selectedSong,
        AMInstance,
        user,
        service,
        user.spotifyToken
      );
    }
  }, [user, props.selectedSong]);

  useEffect(() => {
    console.log("other fired");
  }, [props.selectedSong]);

  useEffect(() => {
    const setSong = async (song_uri: string, deviceId: string) => {
      await spotifyRefresh();

      const url =
        "https://api.spotify.com/v1/me/player/play?" +
        new URLSearchParams({ device_id: deviceId });

      if (user) {
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.spotifyToken}`,
          },
          body: JSON.stringify({
            uris: [song_uri],
            position_ms: 0,
          }),
        });
      }
    };

    if (deviceId && song && player) {
      setSong(song.uri, deviceId).then(() => {
        playMusicHandler();
      });
    }
  }, [deviceId, song]);

  useEffect(() => {
    if (user) {
      // dynamically import Spotify

      const refresh = async () => {
        await spotifyRefresh();
      };

      refresh();

      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(user.spotifyToken || "");
          },
          volume: 0,
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

        // reference: https://github.com/spotify/web-playback-sdk/issues/106
        let currState = {
          paused: false,
          position: 0,
          duration: 0,
          updateTime: 0,
        };

        player.addListener("player_state_changed", (state) => {
          currState.paused = state.paused;
          currState.position = state.position;
          currState.duration = state.duration;
          currState.updateTime = performance.now();
        });

        const getStatePosition = () => {
          if (currState.paused) {
            return currState.position
              ? (currState.position * 100) / currState.duration
              : 0;
          }
          const position =
            ((currState.position + (performance.now() - currState.updateTime)) *
              100) /
            currState.duration;
          return position > currState.duration
            ? (currState.duration * 100) / currState.duration
            : position;
        };

        const interval = setInterval(() => {
          const position = getStatePosition();
          setProgress(position);

          if (position > 10) {
            console.log("song over");
            clearInterval(interval);
            props.playNext();
          }
        }, 300);

        return () => clearInterval(interval);
      };
    }
  }, [user]);

  return (
    <div className="flex h-[50%] mt-8 justify-center pb-5">
      <div className="bg-white rounded-lg w-[90%] h-full drop-shadow-md p-4 flex flex-col items-center justify-between">
        <img className="w-1/2 mt-5 h-1/2" src={song?.img}></img>
        <div className="text-lg font-semibold text-center">{song?.name}</div>
        <div
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          onClick={() => {
            playMusicHandler();
          }}
        >
          <img
            className="w-5 h-5"
            src={
              isPlaying
                ? "/img/icons/pause-icon.svg"
                : "/img/icons/play-icon.svg"
            }
          ></img>
        </div>
        <div className="w-full h-1 mb-2 bg-neutral-200 dark:bg-neutral-600">
          <div
            className={`h-1 bg-red-400`}
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default SpotifyPartyRoomPlayerCard;

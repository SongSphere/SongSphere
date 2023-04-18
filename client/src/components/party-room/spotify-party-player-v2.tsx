import { useEffect, useRef, useState } from "react";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";
import selectService from "../../services/user/select-service";
import Session from "../../session";
import { spotifyRefresh } from "../../services/spotify/spotify-refresh";

interface ISpotifySong {
  name: string;
  img: string;
  artists: string[];
  uri: string;
}

interface ISpotifyPlayerCardProps {
  isSongOver: boolean;
  setIsSongOver: Function;
  selectedSong: TMusicContent | null;
}

const SpotifyPartyRoomPlayerV2 = (props: ISpotifyPlayerCardProps) => {
  const [song, setSong] = useState<ISpotifySong | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [AMInstance, setAMInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);
  const playerRef = useRef<Spotify.Player | null>(null);

  const currStateRef = useRef({
    paused: false,
    position: 0,
    duration: 0,
    updateTime: 0,
  });

  const getStatePosition = () => {
    const position =
      ((currStateRef.current.position +
        (performance.now() - currStateRef.current.updateTime)) *
        100) /
      currStateRef.current.duration;

    if (position > currStateRef.current.duration) {
      return (
        (currStateRef.current.duration * 100) / currStateRef.current.duration
      );
    } else {
      return position;
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

  const setSongInPlayer = async (song_uri: string, deviceId: string) => {
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

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
    setAMInstance(Session.getAMInstance());
  }, [Session.getUser()]);

  useEffect(() => {
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
    if (user) {
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
          volume: 1,
        });

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

        player.addListener("player_state_changed", (state) => {
          if (
            currStateRef.current &&
            state.track_window.previous_tracks.find(
              (x) => x.id === state.track_window.current_track.id
            ) &&
            !currStateRef.current.paused &&
            state.paused
          ) {
            console.log("Track ended");
            props.setIsSongOver(true);
          }

          currStateRef.current.paused = state.paused;
          currStateRef.current.position = state.position;
          currStateRef.current.duration = state.duration;
          currStateRef.current.updateTime = performance.now();
        });

        playerRef.current = player;
      };
    }
  }, [user]);

  useEffect(() => {
    if (deviceId && song && playerRef.current) {
      currStateRef.current.position = 0;
      setProgress(0);

      setSongInPlayer(song.uri, deviceId).then(() => {
        const interval = setInterval(() => {
          const position = getStatePosition();
          setProgress(position);
        }, 100);

        return () => {
          clearInterval(interval);
        };
      });
    }
  }, [song, user, deviceId]);

  return (
    <div className="flex flex-row justify-center h-full text-white lg:flex-col">
      <div className="flex w-1/2 p-4 lg:w-full">
        <img className="w-24 h-24" src={song?.img}></img>
        <div className="pl-2">
          <div className="text-2xl font-semibold ">{song?.name}</div>
          {song?.artists.map((artist) => {
            return <p className="text-white">{artist}</p>;
          })}
        </div>
      </div>
      <div className="w-1/2 p-4 lg:w-full">
        <div className="flex flex-col mt-4 place-items-center">
          <div className="w-4/5 h-1 mt-5 bg-neutral-200 dark:bg-neutral-600">
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
  );
};
export default SpotifyPartyRoomPlayerV2;

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

  useEffect(() => {
    // const addSongToQueue = async (songUrl: string, song: ISpotifySong) => {
    //   await fetch(
    //     "https://api.spotify.com/v1/me/player/queue" +
    //       new URLSearchParams({ uri: song.uri, device_id:  })
    //   );
    // };

    const fetchSong = async (songId: string) => {
      if (props.user) {
        await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.spotifyToken}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            const song: ISpotifySong = {
              name: data.name,
              album: {
                images: data.album.images[0].url,
              },
              artists: data.album.artists.map((artist: any) => {
                return artist.name;
              }),
              uri: data.uri,
            };
            console.log(data);
            setSong(song);
          });
      } else {
        console.error("user not set");
      }
    };
    fetchSong(songId);
  }, []);

  const playMusicHandler = () => {
    setIsPlaying(!isPlaying);

    // if (musicInstance != null) {
    //   if (!isPlaying) {
    //     musicInstance.play();
    //   } else {
    //     musicInstance.pause();
    //   }
    // } else {
    //   console.error("music not instantiated");
    // }
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

import { useEffect, useState } from "react";
import { appleMusicInstance } from "../services/apple-music-link";

const MusicPlayerCard = () => {
  const songId = 716192621;

  const [isPlaying, setIsPlaying] = useState(false);
  const [music, setMusic] = useState<MusicKit.MusicKitInstance | null>(null);
  const [progress, setProgress] = useState(0);
  const [song, setSong] = useState<MusicKit.Resource | null>(null);

  music?.addEventListener("playbackTimeDidChange", () => {
    setProgress(music.player.currentPlaybackProgress * 100);
  });

  useEffect(() => {
    const FetchSong = async (songId: number) => {
      if (music) {
        const song = await music.api.song(songId.toString());
        setSong(song);

        const mediaItemOptions: MusicKit.MediaItemOptions = {
          id: song.id,
          attributes: song.attributes,
          type: song.type,
        };

        const mediaItem = new MusicKit.MediaItem(mediaItemOptions);

        if (music) {
          music.setQueue({
            items: [mediaItem],
          });
        }
      }
    };
    FetchSong(songId);
  }, [music]);

  useEffect(() => {
    const appleMusicConfigureHandler = async () => {
      await appleMusicInstance.then((musicInstance) => {
        setMusic(musicInstance);
      });
    };
    appleMusicConfigureHandler();
  }, []);

  const playMusicHandler = () => {
    setIsPlaying(!isPlaying);

    if (music != null) {
      if (!isPlaying) {
        music.play();
      } else {
        music.pause();
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
              <img src="/img/trackCoverDemo.jpg"></img>
            </div>
          </div>
          <div className="px-6 mt-2 text-2xl text-center">
            {song?.attributes.name}
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

          {/* <div>{time}</div> */}
        </div>
      </div>
    </div>
  );
};
export default MusicPlayerCard;

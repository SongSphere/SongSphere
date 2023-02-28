import { useContext, useEffect, useState } from "react";
// import { musicInstance } from "../services/apple-music-link";
// import { appleMusicContext } from "../context/appleMusicContext";

interface IMusicPlayerCardProps {
  musicInstance: MusicKit.MusicKitInstance;
}

const AppleMusicPlayerCard = (props: IMusicPlayerCardProps) => {
  const songId = 716192621;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [song, setSong] = useState<MusicKit.Resource | null>(null);

  const musicInstance = props.musicInstance;
  musicInstance.addEventListener("playbackTimeDidChange", () => {
    setProgress(musicInstance.player.currentPlaybackProgress * 100);
  });

  useEffect(() => {
    const fetchSong = async (songId: number) => {
      if (musicInstance) {
        const song = await musicInstance.api.song(songId.toString());
        setSong(song);

        const mediaItemOptions: MusicKit.MediaItemOptions = {
          id: song.id,
          attributes: song.attributes,
          type: song.type,
        };

        const mediaItem = new MusicKit.MediaItem(mediaItemOptions);

        musicInstance.setQueue({
          items: [mediaItem],
        });
      } else {
        console.error("music not set");
      }
    };
    fetchSong(songId);
  }, []);

  const playMusicHandler = () => {
    setIsPlaying(!isPlaying);

    if (musicInstance != null) {
      if (!isPlaying) {
        musicInstance.play();
      } else {
        musicInstance.pause();
      }
    } else {
      console.error("music not instantiated");
    }
  };

  return (
    <div className="flex justify-center h-screen ">
      <div className="flex h-full mt-8 ml-5">
        <div className="bg-white w-80 h-5/6">
          <div className="flex justify-center">
            <div className="w-4/5 mt-5">
              <img
                src={
                  song
                    ? song.attributes.artwork.url
                        .replace("{w}", 1000)
                        .replace("{h}", 1000)
                    : ""
                }
              ></img>
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
        </div>
      </div>
    </div>
  );
};
export default AppleMusicPlayerCard;

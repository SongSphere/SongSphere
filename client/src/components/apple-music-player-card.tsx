import { useEffect, useState } from "react";
import selectService from "../services/posts/select-service";
import { TMusicContent } from "../types/music-content";
import { TUser } from "../types/user";

interface IMusicPlayerCardProps {
  musicInstance: MusicKit.MusicKitInstance;
  selectedSong: TMusicContent | null;
  user: TUser | null;
  service: string;
}

const AppleMusicPlayerCard = (props: IMusicPlayerCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [song, setSong] = useState<MusicKit.Resource | null>(null);

  const musicInstance = props.musicInstance;
  musicInstance.addEventListener("playbackTimeDidChange", () => {
    setProgress(musicInstance.player.currentPlaybackProgress * 100);
  });

  useEffect(() => {
    const fetchSong = async (songId: string) => {
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

    const selectServiceHandler = async (
      selectedSong: TMusicContent,
      appleMusicInstance: MusicKit.MusicKitInstance,
      user: TUser,
      service: string
    ) => {
      await selectService(selectedSong, appleMusicInstance, user, service).then(
        (bestFitId) => {
          if (bestFitId != "-1") {
            fetchSong(bestFitId);
          }
        }
      );
    };

    if (props.selectedSong) {
      selectServiceHandler(
        props.selectedSong,
        props.musicInstance,
        props.user!,
        props.service
      );
    }

    if (props.selectedSong) {
      fetchSong(props.selectedSong.id);
    }
  }, [props.selectedSong]);

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
    <div className="relative flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6 drop-shadow-md">
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

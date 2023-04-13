import { useEffect, useState } from "react";
import setActivity from "../../services/general/set-activity";
import selectService from "../../services/user/select-service";
import Session from "../../session";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";

interface IMusicPlayerCardProps {
  selectedSong: TMusicContent | null;
}

const AppleMusicPlayerCard = (props: IMusicPlayerCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState<TUser | null>(null);
  const [song, setSong] = useState<MusicKit.Resource | null>(null);
  const [service, setService] = useState<string>("");
  const [AMInstance, setAMInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
    setAMInstance(Session.getAMInstance());
  }, [Session.getUser()]);

  useEffect(() => {
    if (AMInstance) {
      AMInstance.addEventListener("playbackTimeDidChange", () => {
        setProgress(AMInstance.player.currentPlaybackProgress * 100);
      });
    }
  }, [AMInstance]);

  useEffect(() => {
    const fetchSong = async (songId: string) => {
      if (AMInstance) {
        const song = await AMInstance.api.song(songId.toString());
        setSong(song);

        const mediaItemOptions: MusicKit.MediaItemOptions = {
          id: song.id,
          attributes: song.attributes,
          type: song.type,
        };

        const mediaItem = new MusicKit.MediaItem(mediaItemOptions);

        AMInstance.setQueue({
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

    if (props.selectedSong && user && AMInstance) {
      selectServiceHandler(props.selectedSong, AMInstance, user, service);
    }

    if (props.selectedSong) {
      fetchSong(props.selectedSong.id);
    }
  }, [props.selectedSong, user, AMInstance]);

  const playMusicHandler = () => {
    setIsPlaying(!isPlaying);

    if (AMInstance != null) {
      if (!isPlaying) {
        AMInstance.play();
        if (props.selectedSong) {
          setActivity(props.selectedSong);
        }
      } else {
        AMInstance.pause();
        if (props.selectedSong) {
          setActivity(null);
        }
      }
    } else {
      console.error("music not instantiated");
    }
  };

  return (
    <div className="flex justify-center h-full text-white">
      <div className="flex h-full">
        <div className="rounded-lg w-80 h-5/6 drop-shadow-md">
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
          <div className="px-6 mt-2 text-2xl font-semibold text-center">
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
                    ? "/img/icons/pause-icon.svg"
                    : "/img/icons/play-icon.svg"
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

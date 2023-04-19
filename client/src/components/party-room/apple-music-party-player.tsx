import { useEffect, useState } from "react";
import setActivity from "../../services/general/set-activity";
import selectService from "../../services/user/select-service";
import Session from "../../session";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";

interface IMusicPlayerCardProps {
  selectedSong: TMusicContent | null;
}

const AppleMusicPartyRoomPlayerCard = (props: IMusicPlayerCardProps) => {
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
    <div className="flex flex-row justify-center text-white h-1/2 lg:flex-col">
      <div className="flex w-1/2 p-4 lg:w-full">
        <img
          className="w-24 h-24"
          src={
            song
              ? song.attributes.artwork.url
                  .replace("{w}", 1000)
                  .replace("{h}", 1000)
              : ""
          }
        ></img>
        <div className="pl-2">
          <div className="text-2xl font-semibold ">{song?.attributes.name}</div>
          {/* {song.artists.map((artist) => {
            return <p className="text-white">{artist}</p>;
          })} */}
        </div>
      </div>
      <div className="w-1/2 p-4 lg:w-full">
        <div className="flex flex-col mt-4 place-items-center">
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
export default AppleMusicPartyRoomPlayerCard;

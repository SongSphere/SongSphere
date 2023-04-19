import { useEffect, useState } from "react";
import setActivity from "../../services/general/set-activity";
import selectService from "../../services/user/select-service";
import Session from "../../session";
import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";

interface IMusicPlayerCardProps {
  isSongOver: boolean;
  setIsSongOver: Function;
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
    console.log("cleanup function");
    // Cleanup function to stop playback and clear the queue when the component is unmounted
    return () => {
      if (AMInstance) {
        if (AMInstance.player.isPlaying) {
          AMInstance.player.pause();
        }
        AMInstance.setQueue({ items: [] });
      }
    };
  }, [AMInstance]);

  useEffect(() => {
    console.log("useEffect for song changed", props.selectedSong?.name);

    if (AMInstance && AMInstance.player.isPlaying) {
      AMInstance.player.pause();
    }

    if (AMInstance) {
      AMInstance.addEventListener("playbackTimeDidChange", () => {
        setProgress(AMInstance.player.currentPlaybackProgress * 100);
      });

      // Add an event listener to detect when a song ends
      AMInstance.addEventListener("playbackStateDidChange", () => {
        if (
          AMInstance.player.playbackState === MusicKit.PlaybackStates.paused
        ) {
          const currentProgress = AMInstance.player.currentPlaybackProgress;
          if (currentProgress >= 0.99) {
            console.log("Track ended");
            props.setIsSongOver(true);
          }
        }
      });
    }

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

        AMInstance.setQueue({ items: [] });
        AMInstance.setQueue({ items: [mediaItem] });

        AMInstance.play();
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
      fetchSong(props.selectedSong.id);
      AMInstance.play();
    } else {
      console.log("else 1");
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
    <div className="flex flex-row justify-centertext-white lg:mb-5 h-fit lg:flex-col">
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
          <div className="text-2xl font-semibold text-white">
            {song?.attributes.name}
          </div>
          <div className="text-white">{props.selectedSong?.artist}</div>
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
export default AppleMusicPartyRoomPlayerCard;

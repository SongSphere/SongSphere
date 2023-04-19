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
    console.log("hello");
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

    const fetchSong = async (songId: string) => {
      console.log("fetching song");
      if (AMInstance) {
        const song = await AMInstance.api.song(songId.toString());
        console.log("fetched ", song);
        setSong(song);

        const mediaItemOptions: MusicKit.MediaItemOptions = {
          id: song.id,
          attributes: song.attributes,
          type: song.type,
        };

        const mediaItem = new MusicKit.MediaItem(mediaItemOptions);

        if (AMInstance.player.isPlaying) {
          AMInstance.player.pause();
        }

        AMInstance.setQueue({ items: [] }).then(() => {
          AMInstance.setQueue({ items: [mediaItem] }).then(() => {
            console.log("play");
            setTimeout(() => {
              AMInstance.play();
            }, 500); // Add a delay of 500ms before playing the song
          });
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
    } else {
      console.log("else 1");
    }
  }, [props.selectedSong, user, AMInstance]);

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

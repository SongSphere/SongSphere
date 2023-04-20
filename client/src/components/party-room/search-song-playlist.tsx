import { useEffect, useState } from "react";
import {
  getApplePlaylists,
  getAppleTracksFromPlaylist,
} from "../../services/apple/apple-get-playlists";
import addQueue from "../../services/party/add-queue";
import {
  getSpotifyPlaylists,
  getSpotifyTracksFromPlaylist,
} from "../../services/spotify/spotify-get-playlists";
import Session from "../../session";
import { TMusicContent } from "../../types/music-content";
import { TPlaylist } from "../../types/playlist";
import { TUser } from "../../types/user";

const LIMIT = 20;

interface ISearchSongPlayListProps {
  isVisible: boolean;
  onClose: Function;
  user: TUser;
}

const SearchSongPlayList = (props: ISearchSongPlayListProps) => {
  const musicService = Session.getMusicService();
  const AMInstance = Session.getAMInstance();

  const [playlists, setPlaylists] = useState<TPlaylist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<TPlaylist | null>(
    null
  );
  const [tracks, setTracks] = useState<TMusicContent[]>([]);
  const [selectedSong, setSelectedSong] = useState<TMusicContent | null>();

  const handleOnClose = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "container") {
      props.onClose();
    }
  };

  useEffect(() => {
    if (musicService === "apple") {
      if (AMInstance) {
        getApplePlaylists(LIMIT, AMInstance).then((playlists) => {
          setPlaylists(playlists);
        });
      }
    } else {
      getSpotifyPlaylists(props.user.spotifyToken, LIMIT).then((playlists) => {
        setPlaylists(playlists);
      });
    }
  }, []);

  useEffect(() => {
    if (selectedPlaylist) {
      if (musicService === "apple") {
        if (AMInstance) {
          getAppleTracksFromPlaylist(selectedPlaylist.id, AMInstance).then(
            (songs) => {
              setTracks(songs);
            }
          );
        }
      } else {
        getSpotifyTracksFromPlaylist(
          selectedPlaylist.tracks_link,
          props.user.spotifyToken
        ).then((songs) => {
          console.log(songs);
          setTracks(songs);
        });
      }
    }
  }, [selectedPlaylist]);

  if (!props.isVisible) {
    return null;
  }

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className=" w-5/6 lg:w-3/5 p-5 bg-white rounded h-[68vh]">
        <h1 className="py-3 font-semibold text-center text-gray-900 border-b-4 border-solid border-b-lgrey">
          Search Playlists
        </h1>
        <div className="flex border-b-4 border-solid border-b-lgrey">
          <div className="w-1/2 ">
            {/* <div className="relative w-full h-full"> */}
            <div className="pt-2 pb-2 text-xl font-semibold text-center bg-white">
              Playlists
            </div>
            <div className="overflow-y-auto no-scrollbar max-h-[40vh] ">
              {playlists.map((playlist) => {
                return (
                  <div
                    className="transition ease-in-out cursor-pointer hover:bg-slate-200 delay-50"
                    onClick={() => {
                      setSelectedPlaylist(playlist);
                    }}
                  >
                    <div className="flex">
                      <div className="w-24 h-24">
                        <img src={playlist.cover_url}></img>
                      </div>
                      <div className="grid pl-4 place-content-center">
                        {playlist.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* </div> */}
          </div>
          <div className="w-1/2">
            <div className="pt-2 pb-2 text-xl font-semibold text-center bg-white">
              Songs
            </div>
            {selectedPlaylist && (
              <div className="w-1/2 overflow-y-auto max-h-[40vh] no-scrollbar">
                {tracks.map((song) => {
                  return (
                    <div className="flex">
                      <div className="w-1/5">
                        <img src={song.cover}></img>
                      </div>
                      <div
                        className="w-4/5 cursor-pointer"
                        onClick={() => {
                          setSelectedSong(song);
                        }}
                      >
                        <div className="pl-4">{song.name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="pt-1">
          <div>
            {selectedSong && (
              <div>
                <div className="flex w-full text-sm">
                  <div className="w-16">
                    <img src={selectedSong.cover} />
                  </div>
                  {/* <div className="w-1/5"></div> */}
                  <div className="w-3/5 pl-2">
                    <div className="truncate">{selectedSong.name}</div>
                    <div className="truncate">{selectedSong.artist}</div>
                  </div>
                  <div>
                    <button
                      className="px-2 py-1 ml-2 rounded-lg drop-shadow-lg bg-sky-300 hover:bg-sky-400"
                      onClick={async () => {
                        await addQueue(selectedSong);
                        setSelectedPlaylist(null);
                        setSelectedSong(null);
                        props.onClose();
                      }}
                    >
                      add
                    </button>
                  </div>
                </div>
                {/* <div>{selectedSong.name}</div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSongPlayList;

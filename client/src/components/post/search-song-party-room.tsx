import React, { useState } from "react";
import { useEffect } from "react";
import appleSearch from "../../services/apple/apple-search";
import { TMusicContent } from "../../types/music-content";
import { spotifySearch } from "../../services/spotify/spotify-search";
import { TUser } from "../../types/user";
import Session from "../../session";
import addQueue from "../../services/party/add-queue";

const AppleSearch = async (
  term: string,
  category: string,
  limit: number,
  musicInstance: MusicKit.MusicKitInstance
) => {
  return appleSearch(term, category, limit, musicInstance);
};

const SpotifySearch = async (
  term: string,
  category: string,
  token: string,
  limit: number
) => {
  return spotifySearch(term, category, token, limit);
};

interface ISearchSongProps {
  song?: string;
}

const SearchSongPartyRoom = (props: ISearchSongProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState("");
  let [songs, setSongs] = useState<TMusicContent[]>([]);
  let [selected, setSelected] = useState<TMusicContent>();
  let [song, setSong] = useState<string>("");
  let [category, setCategory] = useState<string>("songs");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [AMInstance, setAMInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
    setAMInstance(Session.getAMInstance());
  }, [Session.getUser()]);

  // useEffect(() => {
  //   if (user) {
  //     if (props.song && user) {
  //       selectService(props.song, "songs", 1).then((result) => {
  //         setCategory("songs");
  //         setSongs(result!);
  //         if (result) {
  //           setSelected(result[0]);
  //         }
  //       });
  //     }
  //   }
  // }, [user]);

  const selectService = async (
    term: string,
    category: string,
    limit: number
  ) => {
    if (user && AMInstance) {
      if (service === "apple") {
        return AppleSearch(term, category, limit, AMInstance);
      } else if (service === "spotify") {
        return SpotifySearch(term, category, user.spotifyToken, limit);
      } else {
        console.error("no service available");
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex">
        <div className="relative w-2/3">
          <input
            className="w-full border-b-2 outline-none border-b-lgrey"
            placeholder="Enter Song Name"
            value={song}
            onChange={(event) => {
              setSong(event.target.value);
              selectService(event.target.value as string, category, 8).then(
                (result) => {
                  setSongs(result!);
                }
              );
            }}
          />
          <div className="w-full ">
            <div className="absolute overflow-y-auto max-h-40 no-scrollbar">
              {songs.map((s) => (
                <div className="grid w-full grid-flow-col">
                  <button
                    className="w-full text-center bg-white border-2 border-solid text-navy border-lblue hover:text-gray-400 hover:text-lg"
                    key={s.id}
                    onClick={() => {
                      setSelected(s);
                      setSongs([]);
                      if (s.name) {
                        setSong(s.name);
                      }
                    }}
                  >
                    <div className="flex w-full text-sm text-center">
                      <div className="w-10 h-10 ">
                        <img src={s.cover} />
                      </div>
                      {s.name}
                      <br />
                      {s.artist}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <button
            className="px-2 py-1 ml-2 rounded-lg drop-shadow-lg bg-sky-300 hover:bg-sky-400"
            onClick={async () => {
              setOpen2(true);
              if (user) {
                await addQueue(selected!);
              }
            }}
          >
            Add Song
          </button>
        </div>
      </div>
      {selected && (
        <div className="flex w-full text-sm">
          <div className="w-1/5">
            <img src={selected.cover} />
          </div>
          <div className="w-4/5 pl-2">
            <div className="truncate">{selected.name}</div>
            <div className="truncate">{selected.artist}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSongPartyRoom;

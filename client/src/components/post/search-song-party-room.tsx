import React, { useState } from "react";
import { useEffect } from "react";
import appleSearch from "../../services/apple/apple-search";
import { TMusicContent } from "../../types/music-content";
import { spotifySearch } from "../../services/spotify/spotify-search";
import sendPost from "../../services/post/send-post";
import { TUser } from "../../types/user";
import Popup from "reactjs-popup";
import Session from "../../session";
import { TPost } from "../../types/post";
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
  // musicInstance: MusicKit.MusicKitInstance;
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
  const [postSuccessFail, setPostSuccessFail] = React.useState<JSX.Element>();
  const [caption, setCaption] = useState<string>("");
  const isRepost = false;

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
    setAMInstance(Session.getAMInstance());
  }, [Session.getUser()]);

  useEffect(() => {
    if (user) {
      if (props.song && user) {
        selectService(props.song, "songs", 1).then((result) => {
          setCategory("songs");
          songs = result!;
          setSongs(result!);
          if (result) {
            setSelected(result[0]);
          }
        });
      }
    }
  }, [user]);

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

  const closeModal = () => setOpen2(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpen2 = () => {
    setOpen2(!open2);
  };

  return (
    <div className="h-full max-w-[95%]">
      <div className="col-span-2 mt-5 ml-5 bg-lgrey rounded-2xl h-[90%] overflow-scroll">
        <h1 className="text-4xl text-center text-navy">Search For</h1>
        <div className="grid justify-center w-full grid-flow-col mt-5">
          <input
            className=""
            placeholder="Enter Song Title"
            onChange={(event) =>
              selectService(event.target.value as string, category, 8).then(
                (result) => {
                  setSong(event.target.value);
                  songs = result!;
                  console.log(songs);
                  setSongs(result!);
                }
              )
            }
          />
        </div>
        <div className="w-[90%] mt-3 mx-auto">
          {songs.map((s) => (
            <div className="grid w-full grid-flow-col">
              <button
                className="w-full text-center bg-white border-2 border-solid text-navy border-lblue hover:text-gray-400 hover:text-lg"
                key={s.id}
                onClick={() => setSelected(s)}
              >
                <div className="flex text-center w-[100%]">
                  <div className="w-20 h-20 ">
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
        <div className="grid-flow-col mt-5 text-center">
          <h1 className="text-2xl text-navy">{selected?.name}</h1>
          <h1 className="text-xl text-navy">{selected?.artist}</h1>
        </div>
        <button
          className="float-right p-2 mb-2 mr-10 rounded-md text-lgrey bg-navy hover:bg-lblue"
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
  );
};

export default SearchSongPartyRoom;
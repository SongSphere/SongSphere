import React, { useState } from "react";
import { useEffect } from "react";
import appleSearch from "../../services/apple-search";
import { TMusicContent } from "../../types/music-content";
import { spotifySearch } from "../../services/spotify-search";
import sendPost from "../../services/send-post";
import { TUser } from "../../types/user";
import PostFailure from "../popup/post-failure";
import PostSucess from "../popup/post-sucess";
import Popup from "reactjs-popup";
import Session from "../../session";
import { TPost } from "../../types/post";

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
  musicInstance: MusicKit.MusicKitInstance;
}

const SearchSong = (props: ISearchSongProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState("");
  let [songs, setSongs] = useState<TMusicContent[]>([]);
  let [selected, setSelected] = useState<TMusicContent>();
  let [song, setSong] = useState<string>("");
  let [category, setCategory] = useState<string>("songs");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [postSuccessFail, setPostSuccessFail] = React.useState<JSX.Element>();

  const [caption, setCaption] = useState<string>("");

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
  }, [Session.getUser()]);

  const selectService = async (
    term: string,
    category: string,
    limit: number
  ) => {
    if (user) {
      if (service === "apple") {
        return AppleSearch(term, category, limit, props.musicInstance);
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
    <div className="p-2">
      <div className="dropdown">
        <button
          className="text-black bg-white border-2 border-solid border-lblue"
          onClick={handleOpen}
        >
          Search For:
        </button>

        {open ? (
          <ul className="text-left menu">
            <li className="songs">
              <button
                className="text-black bg-white border-2 border-solid border-lblue hover:text-lgrey focus:bg-navy focus:text-lgrey"
                onClick={async () =>
                  await selectService(song as string, "songs", 10).then(
                    (result) => {
                      setCategory("songs");
                      songs = result!;
                      setSongs(result!);
                    }
                  )
                }
              >
                {" "}
                Songs{" "}
              </button>
            </li>
            <li className="albums">
              <button
                className="text-black bg-white border-2 border-solid border-lblue hover:text-lgrey focus:bg-navy focus:text-lgrey"
                onClick={() =>
                  selectService(song as string, "albums", 10).then((result) => {
                    setCategory("albums");
                    songs = result!;
                    setSongs(result!);
                  })
                }
              >
                {" "}
                Albums{" "}
              </button>
            </li>
            <li className="artists">
              <button
                className="text-black bg-white border-2 border-solid border-lblue hover:text-lgrey focus:bg-navy focus:text-lgrey"
                onClick={() =>
                  selectService(song as string, "artists", 10).then(
                    (result) => {
                      setCategory("artists");
                      songs = result!;
                      setSongs(result!);
                    }
                  )
                }
              >
                {" "}
                Artists{" "}
              </button>
            </li>
          </ul>
        ) : null}
        <br />
        <input
          className="w-1/2"
          placeholder="Enter Post Title"
          onChange={(event) =>
            selectService(event.target.value as string, category, 10).then(
              (result) => {
                setSong(event.target.value);
                songs = result!;
                setSongs(result!);
              }
            )
          }
        />
      </div>
      {songs.map((s) => (
        <div>
          <button
            className="w-11/12 text-black bg-white border-2 border-solid w-1/2text-center border-lblue hover:text-lgrey focus:bg-navy focus:text-lgrey"
            key={s.id}
            onClick={() => setSelected(s)}
          >
            {s.name} {s.artist}
          </button>
        </div>
      ))}
      <div>
        Selected: {selected?.name} {selected?.artist}
      </div>
      <h1>Enter Caption</h1>
      <form>
        <label>
          <input
            type="text"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
        </label>
      </form>
      {/* This will be edited once merged to incoroporate username userSessionContext */}
      <button
        className="my-5 border-black rounded-md text-lgrey bg-navy"
        onClick={async () => {
          setOpen2(true);
          if (user) {
            const newPost: TPost = {
              username: user.username,
              userEmail: user.email,
              caption: caption,
              music: selected!,
            };
            await sendPost(newPost)
              .then((res) => {
                if (!res) {
                  setPostSuccessFail(<PostFailure />);
                } else {
                  setPostSuccessFail(<PostSucess />);
                }
              })
              .catch((error) => {
                <PostFailure />;
              });
          }
        }}
      >
        Submit
      </button>
      <Popup open={open2} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
            {postSuccessFail}
          </a>
        </div>
      </Popup>
    </div>
  );
};

export default SearchSong;

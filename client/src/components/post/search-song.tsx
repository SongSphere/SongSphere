import React, { useState } from "react";
import { useEffect } from "react";
import appleSearch from "../../services/apple/apple-search";
import { TMusicContent } from "../../types/music-content";
import { spotifySearch } from "../../services/spotify/spotify-search";
import sendPost from "../../services/post/send-post";
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
  const isRepost = false;

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
    <div className="grid h-full grid-cols-4 max-w-[95%]">
    <div className="col-span-2 mt-5 ml-5 bg-lgrey rounded-2xl h-[90%]">
    <h1 className="text-4xl text-center text-navy">Search For</h1>
        <div className="grid w-full grid-flow-col">
          <button
                className="m-5 border-b-2 text-navy border-b-solid border-lblue hover:border-b-yellow-100 hover:text-xl focus:border-b-yellow-100"
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
           <button
                className="m-5 border-b-2 text-navy border-b-solid border-lblue hover:border-b-yellow-100 hover:text-xl visited:border-b-yellow-100"
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
              <button
                className="m-5 border-b-2 text-navy border-b-solid border-lblue hover:border-b-yellow-100 hover:text-xl focus:border-b-yellow-100"
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
        </div>
      <div className="grid justify-center w-full grid-flow-col mt-5">
        <input
            className=""
            placeholder="Enter Post Title"
            onChange={(event) =>
              selectService(event.target.value as string, category, 7).then(
                (result) => {
                  setSong(event.target.value);
                  songs = result!;
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
      {/* This will be edited once merged to incoroporate username userSessionContext */}
      
      
      </div>

      <div className="w-full col-span-2 pt-5 m-5 h-5/6 rounded-xl bg-lgrey">
        <div className="flex justify-center">
          {
            selected ? (
              <img className="max-w-[75%]" src={selected.cover}/>
            ) :null
          }
        </div>
        <div className="grid-flow-col mt-5 text-center">
          <h1 className="text-2xl text-navy">{selected?.name}</h1>
          <h1 className="text-xl text-navy">{selected?.artist}</h1>
          <form className="mt-5">
            <label>
              <input
                type="text"
                value={caption}
                placeholder={"Enter a caption"}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
            </label>
          </form>
        </div>
        <button
        className="float-right p-2 mb-2 mr-10 rounded-md text-lgrey bg-navy hover:bg-lblue"
        onClick={async () => {
          setOpen2(true);
          if (user) {
            const newPost: TPost = {
              username: user.username,
              userEmail: user.email,
              caption: caption,
              music: selected!,
              comments: [],
              likes: 0,
              repost: isRepost,
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

    </div>
  );
};

export default SearchSong;

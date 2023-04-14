import React, { useState } from "react";
import { useEffect } from "react";
import appleSearch from "../../services/apple/apple-search";
import { TMusicContent } from "../../types/music-content";
import { spotifySearch } from "../../services/spotify/spotify-search";
import sendPost from "../../services/post/send-post";
import { TUser } from "../../types/user";
import Session from "../../session";
import { TPost } from "../../types/post";
import FailPopUp from "../popup/fail-popup";
import { useNavigate } from "react-router-dom";

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

const SearchSong = (props: ISearchSongProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState("");
  const [songs, setSongs] = useState<TMusicContent[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [selected, setSelected] = useState<TMusicContent>();
  const [song, setSong] = useState<string>("");
  const [category, setCategory] = useState<string>("songs");
  const [AMInstance, setAMInstance] =
    useState<MusicKit.MusicKitInstance | null>(null);
  const [caption, setCaption] = useState("");
  const [postFailOpen, setPostFailOpen] = useState(false);

  const POST_ERR_MSG =
    "Oops! Your post is not create sucessfully. Try again later!";

  const isRepost = false;
  let navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setCaption(value);

    // Detect "@" symbol
    
    if (value.includes("@") && value.endsWith("@")) {
      setShowDropdown(true);
      // Fetch or update dropdown data based on input value
      // e.g. fetch usernames from API or filter suggestions from local data
    } else {
      setShowDropdown(false);
    }
  };

  const handleDropdownSelection = (
    selectedItem: React.SetStateAction<string>
  ) => {
    // Handle dropdown selection
    setCaption(caption + "" + selectedItem);
    setShowDropdown(false);
  };

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
          setSongs(result!);
          if (result) {
            setSelected(result[0]);
          }
        });
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (user.followers) {
        setFollowers(user.followers);
        
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

  return (
    <div className="grid h-full grid-cols-4 max-w-[95%]">
      <div className="col-span-2 mt-5 ml-5 bg-lgrey rounded-2xl h-[90%]">
        <h1 className="text-4xl text-center text-navy">Search For</h1>
        <div className="grid w-full grid-flow-col">
          <button
            className="m-5 border-b-2 text-navy border-b-solid border-lblue hover:border-b-yellow-100 hover:text-xl focus:border-b-yellow-100"
            onClick={async () =>
              await selectService(song as string, "songs", 8).then((result) => {
                setCategory("songs");
                setSongs(result!);
              })
            }
          >
            {" "}
            Songs{" "}
          </button>
          <button
            className="m-5 border-b-2 text-navy border-b-solid border-lblue hover:border-b-yellow-100 hover:text-xl visited:border-b-yellow-100"
            onClick={async () =>
              await selectService(song as string, "albums", 8).then(
                (result) => {
                  setCategory("albums");
                  setSongs(result!);
                }
              )
            }
          >
            {" "}
            Albums{" "}
          </button>
          <button
            className="m-5 border-b-2 text-navy border-b-solid border-lblue hover:border-b-yellow-100 hover:text-xl focus:border-b-yellow-100"
            onClick={async () =>
              await selectService(song as string, "artists", 8).then(
                (result) => {
                  setCategory("artists");
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
              selectService(event.target.value as string, category, 8).then(
                (result) => {
                  setSong(event.target.value);
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
          {selected ? (
            <img className="max-w-[75%]" src={selected.cover} />
          ) : null}
        </div>
        <div className="grid-flow-col mt-5 text-center">
          <h1 className="text-2xl text-navy">{selected?.name}</h1>
          <h1 className="text-xl text-navy">{selected?.artist}</h1>
          <form className="mt-5">
            <label>
              {/* <input
                type="text"
                value={caption}
                placeholder={"Enter a caption"}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              /> */}
              <input
                type="text"
                value={caption}
                onChange={handleInputChange}
                placeholder="Type '@' to mention someone..."
              />
              {showDropdown && (
                <ul className="w-[40%] mt-3 mx-auto">
                {followers.map((s) => (
                  <div className="grid w-full grid-flow-col">
                    <button
                      className="w-full text-center bg-white border-2 border-solid text-navy border-lblue hover:text-gray-400 hover:text-lg"
                      key={s}
                      onClick={() => handleDropdownSelection(s)}
                    >
                      <div className="flex text-center w-[75%]">
    
                        {s}
                   
                      </div>
                    </button>
                  </div>
                ))}
              </ul>
              )}
     
            </label>
          </form>
        </div>
        <button
          className="float-right p-2 mb-2 mr-10 rounded-md text-lgrey bg-navy hover:bg-lblue"
          onClick={async () => {
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
                    setPostFailOpen(true);
                  } else {
                    navigate("/profile");
                  }
                })
                .catch((err) => {
                  setPostFailOpen(true);
                });
            }
          }}
        >
          Submit
        </button>
        <FailPopUp
          failText={POST_ERR_MSG}
          open={postFailOpen}
          setOpen={setPostFailOpen}
        />
      </div>
    </div>
  );
};

export default SearchSong;

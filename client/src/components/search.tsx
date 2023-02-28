import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import appleSearch from "../services/apple-search";
import { TMusicContent } from "../types/music-content";
import { spotifySearch } from "../services/spotify-search";
import sendPost from "../services/send-post";
import { TUser } from "../types/user";
import SearchOption from "./search-option-button";

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

interface ISearchProps {
  musicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
}

interface ISearchProps {
  musicInstance: MusicKit.MusicKitInstance;
}

const Search = (props: ISearchProps) => {
  const appleToken = props.user?.appleToken;
  const spotifyToken = props.user?.spotifyToken;
  let service = "";

  if (spotifyToken !== "") {
    service = "spotify";
  } else if (appleToken !== "") {
    service = "apple";
  } else {
    console.log("NO SERVICE");
  }

  const selectService = async (
    term: string,
    category: string,
    limit: number
  ) => {
    if (service === "apple") {
      return AppleSearch(term, category, limit, props.musicInstance);
    } else {
      return SpotifySearch(term, category, props.user?.spotifyToken!, limit);
    }
  };

  //let songs: [string, string][] = useState([]);
  let [songs, setSongs] = useState<TMusicContent[]>([]);
  let [selected, setSelected] = useState<TMusicContent>();
  let [song, setSong] = useState<string>("");
  let [category, setCategory] = useState<string>("songs");
  const [open, setOpen] = React.useState(false);

  const [caption, setCaption] = useState<string>("");

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="dropdown">
        <button
          className="mx-2 text-black bg-white border-2 border-solid border-lblue"
          onClick={handleOpen}
        >
          Search For:
        </button>

        {open ? (
          <ul className="mx-2 text-left menu">
            <li className="songs">
              <button
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
          <button key={s.id} onClick={() => setSelected(s)}>
            {s.name}
          </button>
        </div>
      ))}
      <div>Selected: {selected?.name}</div>
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
        onClick={() =>
          sendPost(props.user?.userName!, props.user?.name!, caption, selected!)
        }
      >
        Submit
      </button>
    </div>
  );
};

export default Search;

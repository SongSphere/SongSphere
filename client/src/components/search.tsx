/*
  This is a temporary test component for linking to Apple Music API
*/

import React, { useState, useContext } from "react";

// import services
import { useEffect } from "react";
import styled from "styled-components";
import appleSearch from "../services/apple-search";
import checkService from "../services/check-service";
import { userSessionContext, TUser } from "../context/userSessionContext";

const AppleSearch = async (term: string, category: string) => {
  return appleSearch(term, category);
};

const SpotifySearch = async (term: string, category: string) => {};

const Search = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);

  const appleToken = user?.appleToken;
  const spotifyToken = user?.spotifyToken;
  let service = "";

  if (appleToken !== "") {
    service = "apple";
    console.log("apple");
  } else if (spotifyToken !== "") {
    service = "spotify";
    console.log("spotify");
  } else {
    console.log("NO SERVICE");
  }

  const selectService = async (term: string, category: string) => {
    if (service === "apple") {
      return AppleSearch(term, category);
    } else {
      return SpotifySearch(term, category);
    }
  };

  //let songs: [string, string][] = useState([]);
  let [songs, setSongs] = useState<any[]>([]);
  let [selected, setSelected] = useState<string[]>([]);
  let [song, setSong] = useState<string>("");
  let [category, setCategory] = useState<string>("songs");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* <input
        placeholder="Enter Post Title"
        onChange={(event) =>
          appleSearch(event.target.value as string, category).then((result) => {
            setSong(event.target.value);
            songs = result!;
            setSongs(result!);
          })
        }
      /> */}
      <input
        placeholder="Enter Post Title"
        onChange={(event) =>
          selectService(event.target.value as string, category).then(
            (result) => {
              setSong(event.target.value);
              songs = result!;
              setSongs(result!);
            }
          )
        }
      />
      <div className="dropdown">
        <button onClick={handleOpen}>Dropdown</button>
        {open ? (
          <ul className="menu">
            <li className="songs">
              <button
                onClick={() =>
                  selectService(song as string, "songs").then((result) => {
                    setCategory("songs");
                    console.log(result);
                    songs = result!;
                    setSongs(result!);
                  })
                }
              >
                Songs
              </button>
            </li>
            <li className="albums">
              <button
                onClick={() =>
                  selectService(song as string, "albums").then((result) => {
                    setCategory("albums");
                    console.log(result);
                    songs = result!;
                    setSongs(result!);
                  })
                }
              >
                Albums
              </button>
            </li>
            <li className="artists">
              <button
                onClick={() =>
                  selectService(song as string, "artists").then((result) => {
                    setCategory("artists");
                    console.log(result);
                    songs = result!;
                    setSongs(result!);
                  })
                }
              >
                Artists
              </button>
            </li>
          </ul>
        ) : null}
      </div>
      <button data-apple-music-skip-to-previous-item></button>
      <h1 id="name"></h1>
      <script>
        const artworkElement = document.querySelector('apple-music-artwork');
        artworkElement.source = album.attributes.artwork;
      </script>
      {songs.map(([song, id]) => (
        <div>
          <button key={id} onClick={() => setSelected([song, id])}>
            {song}
          </button>
        </div>
      ))}
      <div>Selected: {selected}</div>
    </div>
  );
};

export default Search;

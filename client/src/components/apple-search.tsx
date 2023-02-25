/*
  This is a temporary test component for linking to Apple Music API
*/

import React, { useState } from "react";

// import services
import { useEffect } from "react";
import styled from "styled-components";
import search from "../services/apple-search";

const AppleSearch = () => {
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
      <input
        placeholder="Enter Post Title"
        onChange={(event) =>
          search(event.target.value as string, category).then((result) => {
            setSong(event.target.value);
            songs = result!;
            setSongs(result!);
          })
        }
      />
      <div className="dropdown">
        <button onClick={handleOpen}>Dropdown</button>
        {open ? (
          <ul className="menu">
            <li className="songs">
              <button
                onClick={() =>
                  search(song as string, "songs").then((result) => {
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
                  search(song as string, "albums").then((result) => {
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
                  search(song as string, "artists").then((result) => {
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

export default AppleSearch;

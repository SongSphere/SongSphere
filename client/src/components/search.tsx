/*
  This is a temporary test component for linking to Apple Music API
*/

import React, { useState } from "react";

// import services
import { useEffect } from "react";
import styled from "styled-components";
import search from "../services/apple-search";
import checkService from "../services/check-service";

const Button = styled.button`
  background-color: white;
  color: black;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  margin-left: 10px;
  outline: 2px
  inline: block;
  &:hover {
    color: grey;
  }
`;

const Search = () => {
  //let songs: [string, string][] = useState([]);
  let [songs, setSongs] = useState<any[]>([]);
  let [selected, setSelected] = useState<string[]>([]);
  let [song, setSong] = useState<string>("");
  let [category, setCategory] = useState<string>("songs");
  const [open, setOpen] = React.useState(false);
  let service = "";

  useEffect(() => {
    const checkServiceHandler = async () => {
      await checkService().then((result) => {
        service = result;
        console.log("result : " + result);
      });
    };
    checkServiceHandler();
  });

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      
      <div className="dropdown">
    
        <button onClick={handleOpen}>Search For</button>
       
        {open ? (
          <ul className="menu">
            <li className="songs">
              <Button
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
              </Button>
            </li>
            <li className="albums">
              <Button
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
              </Button>
            </li>
            <li className="artists">
              <Button
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
              </Button>
            </li>
          </ul>
        ) : null}
        <br />
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

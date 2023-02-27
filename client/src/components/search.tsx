import React, { useState, useContext } from "react";

// import services
import { useEffect } from "react";
import styled from "styled-components";
import appleSearch from "../services/apple-search";
import checkService from "../services/check-service";
import { userSessionContext, TUser } from "../context/userSessionContext";
import { TSong } from "../types/song";
import { spotifySearch } from "../services/spotify-search";

const AppleSearch = async (term: string, category: string) => {
  return appleSearch(term, category);
};

const SpotifySearch = async (term: string, category: string, token: string) => {
  return spotifySearch(term, category, token);
};

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
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);

  const appleToken = user?.appleToken;
  const spotifyToken = user?.spotifyToken;
  let service = "";

  if (spotifyToken !== "") {
    service = "spotify";
  } else if (appleToken !== "") {
    service = "apple";
  } else {
    console.log("NO SERVICE");
  }

  const selectService = async (term: string, category: string) => {
    if (service === "apple") {
      return AppleSearch(term, category);
    } else {
      return SpotifySearch(term, category, user?.spotifyToken!);
    }
  };

  //let songs: [string, string][] = useState([]);
  let [songs, setSongs] = useState<TSong[]>([]);
  let [selected, setSelected] = useState<TSong>();
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
        <button onClick={handleOpen}>Search For</button>

        {open ? (
          <ul className="menu">
            <li className="songs">
              <Button
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
              </Button>
            </li>
            <li className="albums">
              <Button
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
              </Button>
            </li>
            <li className="artists">
              <Button
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
              </Button>
            </li>
          </ul>
        ) : null}
        <br />
      </div>
      <button data-apple-music-skip-to-previous-item></button>
      <h1 id="name"></h1>
      <script>
        const artworkElement = document.querySelector('apple-music-artwork');
        artworkElement.source = album.attributes.artwork;
      </script>
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
        <label w-20 h-20>
          <input type="text" />
        </label>
      </form>
      <button className="my-5 border-black rounded-md text-lgrey bg-navy">Sumbit</button>
    </div>
    
  );
};

export default Search;

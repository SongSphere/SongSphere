import React, { useState, useContext } from "react";

// import services
import { useEffect } from "react";
import styled from "styled-components";
import appleSearch from "../services/apple-search";
import checkService from "../services/check-service";
import { userSessionContext, TUser } from "../context/userSessionContext";
import { TSong } from "../types/song";
import { spotifySearch } from "../services/spotify-search";
import sendPost from "../services/send-post";
import SearchOption from "./search-option-button";


const AppleSearch = async (term: string, category: string, limit: number) => {
  return appleSearch(term, category, limit);
};

const SpotifySearch = async (
  term: string,
  category: string,
  token: string,
  limit: number
) => {
  return spotifySearch(term, category, token, limit);
};


const Search = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);

  const appleToken = user?.appleToken;
  const spotifyToken = user?.spotifyToken;
  let service = "";

  if (appleToken !== "") {
    service = "apple";
  } else if (spotifyToken !== "") {
    service = "spotify";
  } else {
    console.log("NO SERVICE");
  }

  const selectService = async (
    term: string,
    category: string,
    limit: number
  ) => {
    if (service === "apple") {
      return AppleSearch(term, category, limit);
    } else {
      return SpotifySearch(term, category, user?.spotifyToken!, limit);
    }
  };

  //let songs: [string, string][] = useState([]);
  let [songs, setSongs] = useState<TSong[]>([]);
  let [selected, setSelected] = useState<TSong>();
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
        <button className="mx-2 text-black bg-white border-2 border-solid border-lblue" onClick={handleOpen}>Search For:</button>

        {open ? (
          <ul className="mx-2 text-left menu">
            <li className="songs">
              < SearchOption caption="Songs"
                onClick={() =>
                  selectService(song as string, "songs", 10).then((result) => {
                    setCategory("songs");
                    console.log(result);
                    songs = result!;
                    setSongs(result!);
                  
                  })
                }
              />
                
            </li>
            <li className="albums">
              <SearchOption caption="Albums"
                onClick={() =>
                  selectService(song as string, "albums", 10).then((result) => {
                    setCategory("albums");
                    console.log(result);
                    songs = result!;
                    setSongs(result!);
                  })
                }
              />
              
            </li>
            <li className="artists">
              <SearchOption caption="Artists"
                onClick={() =>
                  selectService(song as string, "artists", 10).then(
                    (result) => {
                      setCategory("artists");
                      console.log(result);
                      songs = result!;
                      setSongs(result!);
                    }
                  )
                }
              />
               
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
        <label >
          <input
            type="text"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
        </label>
      </form>
      <button
        className="my-5 border-black rounded-md text-lgrey bg-navy"
        onClick={() =>
          sendPost(user?.name!, caption, selected!).then((result) =>
          console.log("Hello? " + result)
          )
          
          
        }
      >
        Submit
      </button>
        
    </div>
  );
};

export default Search;

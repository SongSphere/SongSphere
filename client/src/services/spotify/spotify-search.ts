import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TMusicContent } from "../../types/music-content";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const spotifySearch = async (
  query: string,
  category: string,
  token: string,
  limit: number
) => {
  if (query === "") return [];

  let type = "track"; // default to track

  if (category === "albums") {
    type = "album";
  } else if (category === "artists") {
    type = "artist";
  }

  let content: TMusicContent[] = [];

  await fetch(
    `${SPOTIFY_API}/search?q=${encodeURIComponent(
      query
    )}&type=${type}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(async (res) => {
      // passes json to the next handler function
      return res.json();
    })
    .then((data) => {
      if (type === "track") {
        const tracks = data.tracks.items;

        tracks.forEach(function (track: any) {
          content.push({
            name: track.name,
            artist: track.artists[0].name,
            albumName: track.album.name,
            id: track.id,
            service: "spotify",
            category: "song",
            cover: track.album.images[0].url,
          });
        });
      } else if (type === "album") {
        const albums = data.albums.items;

        albums.forEach(function (track: any) {
          content.push({
            name: track.name,
            artist: track.artists[0].name,
            id: track.id,
            service: "spotify",
            category: type,
            cover: track.album.images[0].url,
          });
        });
      } else {
        const artists = data.artists.items;

        artists.forEach(function (track: any) {
          content.push({
            name: track.name,
            id: track.id,
            service: "spotify",
            category: type,
            cover: track.album.images[0].url,
          });
        });
      }
    });

  return content;
};

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomSearch() {
  // A list of all characters that can be chosen.
  const characters = "abcdefghijklmnopqrstuvwxyz";

  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(
    Math.floor(Math.random() * characters.length)
  );
  let randomSearch: string = "";

  // Places the wildcard character at the beginning, or both beginning and end, randomly.
  switch (Math.round(Math.random())) {
    case 0:
      randomSearch = randomCharacter + "%";
      break;
    case 1:
      randomSearch = "%" + randomCharacter + "%";
      break;
  }

  return randomSearch;
}

export const randomSongSpotify = async (token: string, url: string) => {
  return new Promise<TMusicContent>(async (resolve, reject) => {
  let content: TMusicContent[] = [];
  console.log(url);
  await fetch(
    url,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(async (res) => {
      // passes json to the next handler function
      return res.json();
    })
    .then((data) => {
      console.log(data);

      const tracks = data.tracks.items;

      tracks.forEach(function (track: any) {
        console.log("willy debug", track.album.images[0].url)
        content.push({
          name: track.name,
          artist: track.artists[0].name,
          albumName: track.album.name,
          id: track.id,
          service: "spotify",
          category: "song",
          cover: track.album.images[0].url,
        });
      });

      resolve(content[0]);

    }).catch((error) => {
      reject(error);
    });
   

  });
};


export const randomSongSpotifyFromBackend = async (token: string) => {
  return new Promise<string>(async (resolve, reject) => {
  let random_offset = Math.floor(Math.random() * 100); // returns a random integer from 0 to 9

  let content:string = "";


  console.log("Random From backend being being called");

  await fetch(`${process.env.REACT_APP_API}/api/randomsong/seed`, {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      // passes json to the next handler function
      return res.json();
    })
    .then((data) => {
      console.log("Called in randomSongSpotifyFromBackend");
      console.log(data);
      resolve(data.seed)
   
    }).catch((error) => {
      reject(error);
    });
  

  });
};
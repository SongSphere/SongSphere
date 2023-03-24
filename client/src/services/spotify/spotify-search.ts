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

export const randomSongSpotify = async (
  token: string,
) => {

  let random_seed = makeid(2);
  let random_offset = Math.floor(Math.random() * 2000); // returns a random integer from 0 to 9

  let content: TMusicContent[] = [];
  console.log("Random being called");

  await fetch(
    // `${SPOTIFY_API}/search?q=${encodeURIComponent(
    //   query
    // )}&type=${type}&limit=${random_seed}`,

   `${SPOTIFY_API}/search?type=track&offset=${encodeURIComponent(random_offset)}&limit=1&q=${encodeURIComponent(random_seed)}`,
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
      // if (type === "track") {
      //   const tracks = data.tracks.items;

      //   tracks.forEach(function (track: any) {
      //     content.push({
      //       name: track.name,
      //       artist: track.artists[0].name,
      //       albumName: track.album.name,
      //       id: track.id,
      //       service: "spotify",
      //       category: "song",
      //       cover: track.album.images[0].url,
      //     });
      //   });
      // } else if (type === "album") {
      //   const albums = data.albums.items;

      //   albums.forEach(function (track: any) {
      //     content.push({
      //       name: track.name,
      //       artist: track.artists[0].name,
      //       id: track.id,
      //       service: "spotify",
      //       category: type,
      //       cover: track.album.images[0].url,
      //     });
      //   });
      // } else {
      //   const artists = data.artists.items;

      //   artists.forEach(function (track: any) {
      //     content.push({
      //       name: track.name,
      //       id: track.id,
      //       service: "spotify",
      //       category: type,
      //       cover: track.album.images[0].url,
      //     });
      //   });
      // }
    });

  return content;
};
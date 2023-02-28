import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TMusicContent } from "../types/music-content";

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
          });
        });
      }
    });

  return content;
};

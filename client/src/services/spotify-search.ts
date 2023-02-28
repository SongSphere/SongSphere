import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TSong } from "../types/song";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const spotifySearch = async (
  query: string,
  category: string,
  token: string,
  limit: number
) => {
  let type = "";
  if (query === "") return [];

  if (category === "songs") {
    type = "track";
  } else if (category === "albums") {
    type = "album";
  } else if (category === "artists") {
    type = "artist";
  }

  let songs: TSong[] = [];

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
      return res.json();
    })
    .then((data) => {
      if (type === "track") {
        const tracks = data.tracks.items;
        tracks.forEach(function (track: any) {
          songs.push({
            name: track.name,
            artist: track.artists[0].name,
            albumName: track.albumName,
            id: track.id,
            service: "spotify",
            type: type,
          });
        });
      } else if (type === "album") {
        const albums = data.albums.items;
        albums.forEach(function (track: any) {
          songs.push({
            name: track.name,
            artist: track.artists[0].name,
            id: track.id,
            service: "spotify",
            type: type,
          });
        });
      } else {
        const artists = data.artists.items;
        artists.forEach(function (track: any) {
          songs.push({
            name: track.name,
            id: track.id,
            service: "spotify",
            type: type,
          });
        });
      }
      // }
    });

  console.log(songs);

  return songs;
};

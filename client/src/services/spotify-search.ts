import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";
import { TSong } from "../types/song";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const spotifySearch = async (query: string, token: string) => {
  let songs: TSong[] = [];

  await fetch(
    `${SPOTIFY_API}/search?q=${encodeURIComponent(query)}&type=track`,
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
      const tracks = data.tracks.items;

      tracks.forEach(function (track: any) {
        songs.push({
          name: track.name,
          artist: track.artists[0].name,
          albumName: "empty",
          id: track.id,
          service: "spotify",
        });
      });
    });

  console.log(songs);

  return songs;
};

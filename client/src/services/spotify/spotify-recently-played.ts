import { TMusicContent } from "../../types/music-content";
import { spotifyRefresh } from "./spotify-refresh";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const getSpotifyRecentlyPlayedSongs = async (
  token: string,
  limit: number
) => {
  let content: TMusicContent[] = [];

  await spotifyRefresh();

  await fetch(`${SPOTIFY_API}/me/player/recently-played?&limit=${limit}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      console.log(res.status);
      // passes json to the next handler function
      return res.json();
    })
    .then((data) => {

      const items = data.items;

      items.forEach(function (item: any) {
        content.push({
          name: item.track.name,
          artist: item.track.artists[0].name,
          albumName: item.track.album.name,
          id: item.track.id,
          service: "spotify",
          category: "song",
          cover: item.track.album.images[0].url,
        });
      });
    });

  return content;
};

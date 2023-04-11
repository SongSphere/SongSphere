import { TMusicContent } from "../../types/music-content";
import { TPlaylist } from "../../types/playlist";
import { spotifyRefresh } from "./spotify-refresh";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const getSpotifyPlaylists = async (token: string, limit: number) => {
  let playlistsList: TPlaylist[] = [];

  await spotifyRefresh();

  await fetch(`${SPOTIFY_API}/me/playlists?&limit=${limit}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      // passes json to the next handler function
      return res.json();
    })
    .then((data) => {
      const items = data.items;

      items.forEach(function (item: any) {
        playlistsList.push({
          name: item.name,
          id: item.id,
          service: "spotify",
          cover_url: item.images[0].url,
          num_songs: item.tracks.total,
          tracks_link: item.tracks.href,
        });
      });
    });

  return playlistsList;
};

export const getSpotifyTracksFromPlaylist = async (
  link: string,
  token: string
) => {
  let songs: TMusicContent[] = [];

  await spotifyRefresh();

  await fetch(`${link}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      // passes json to the next handler function
      return res.json();
    })
    .then((data) => {
      const items = data.items;

      items.forEach(function (item: any) {
        songs.push({
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

  return songs;
};

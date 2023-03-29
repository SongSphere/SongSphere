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


export const randomSongSpotify = async (token: string, url: string) => {
  return new Promise<TMusicContent>(async (resolve, reject) => {
  let content: TMusicContent[] = [];
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

      resolve(content[0]);

    }).catch((error) => {
      reject(error);
    });
   

  });
};


export const randomSongSpotifyFromBackend = async (token: string) => {
  return new Promise<string>(async (resolve, reject) => {

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
      console.log(data);
      resolve(data.seed)
   
    }).catch((error) => {
      reject(error);
    });
  

  });
};
import { spotifyRefresh } from "../spotify/spotify-refresh";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const spotifyAddToPlayerQueue = async (
  songId: string,
  device_id: string,
  token: string
) => {
  await spotifyRefresh();

  let uri = "";

  // get the song uri
  await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      uri = data.uri;
    })
    .catch((error) => {
      console.error(error);
    });

  // add the song to the player queue
  await fetch(
    `${SPOTIFY_API}/me/player/queue?uri=${uri}&device_id=${device_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(async (res) => {
    console.log(res.status);
    console.log(res.json());
  });
};

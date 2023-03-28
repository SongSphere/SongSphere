import { spotifyRefresh } from "./spotify-link";

const SPOTIFY_API = "https://api.spotify.com/v1";

export const spotifyApiCall = async (
  urlencoded: string,
  access_token: string,
  refresh_token: string
) => {
  return await fetch(`${SPOTIFY_API}${urlencoded}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then(async (res1) => {
    if (res1.status !== 200) {
      let newToken = await spotifyRefresh(refresh_token);

      return await fetch(`${SPOTIFY_API}${urlencoded}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      }).then(async (res2) => {
        if (res2.status === 200) {
          return res2;
        }
      });
    } else {
      return res1;
    }
  });
};

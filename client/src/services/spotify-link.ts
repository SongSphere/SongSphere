const AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";

export const requestSpotifyAuthorization = async () => {
  try {
    let url = AUTHORIZE_ENDPOINT;

    url += "?client_id=" + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    url += "&response_type=code";
    url +=
      "&redirect_uri=" +
      encodeURI(`${process.env.REACT_APP_DIR}/onboard` || window.location.href);
    url += "&show_dialog=true"; // leaving as true for now, can be removed when we don't want to go though auth every login

    url +=
      "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position " +
      "user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";

    window.location.href = url;
  } catch (error) {
    console.log(error);
  }
};

export const spotifyAuth = async (code: string) => {
  // TODO: use promise for return
  await fetch(`${process.env.REACT_APP_API}/api/auth/spotify`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      code: code,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status !== 201) {
      console.error(res);
      return false;
    }
    return true;
  });
};

export const spotifyRefresh = async (refresh_token: string) => {
  let newToken;

  await fetch(`${process.env.REACT_APP_API}/api/auth/spotifyrefresh`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      refresh_token: refresh_token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      return res.json();
    })
    .then((data) => {
      newToken = data.new_token;
    });

  return newToken;
};

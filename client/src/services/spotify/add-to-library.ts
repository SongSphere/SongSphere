const SPOTIFY_API = "https://api.spotify.com/v1";

export const addToLibrary = async (id: string, token: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/spotify/addtolib`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        id: id,
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.status != 201) {
        console.error(res);
        reject(false);
      }
      resolve(true);
    });
  });
};

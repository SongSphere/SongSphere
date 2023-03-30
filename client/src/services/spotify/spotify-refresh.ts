import Session from "../../session";

export const spotifyRefresh = async () => {
  const user = Session.getUser();

  const userTokenEndDate = new Date(user!.spotifyTokenEndDate);
  const edtCurrentTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  if (user && userTokenEndDate < new Date(edtCurrentTime)) {
    await fetch(`${process.env.REACT_APP_API}/api/auth/spotifyrefresh`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        refresh_token: user.spotifyRefreshToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        return res.json();
      })
      .then((data) => {
        user.spotifyToken = data.new_token;
        user.spotifyTokenEndDate = data.expiration_time;

        Session.setUser(user);
      });
  }
};

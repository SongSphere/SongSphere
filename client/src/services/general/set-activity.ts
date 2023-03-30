import { TMusicContent } from "../../types/music-content";

const setActivity = async (song: TMusicContent | null) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/user/setPlayingSong`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        song: song,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default setActivity;

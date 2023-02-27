import { TSong } from "../types/song";

const sendPost = async (name: string, caption: string, song: TSong) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/makepost`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        username: "me asl",
        userEmail: name,
        caption: caption,
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

export default sendPost;

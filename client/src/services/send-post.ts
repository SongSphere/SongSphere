import { TMusicContent } from "../types/music-content";
import PostFailure from "../components/post-failure";
import PostSucess from "../components/post-sucess";

const sendPost = async (
  username: string,
  name: string,
  caption: string,
  music: TMusicContent
) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/makepost`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        username: username,
        userEmail: name,
        caption: caption,
        music: music,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    PostFailure();
  }
  PostSucess();
};

export default sendPost;

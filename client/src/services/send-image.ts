import { TMusicContent } from "../types/music-content";
import PostFailure from "../components/post-failure";
import PostSucess from "../components/post-sucess";

const updateProfile = async (blob: BlobPart) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/user/updateProfile`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        blob: blob,
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

export default updateProfile;

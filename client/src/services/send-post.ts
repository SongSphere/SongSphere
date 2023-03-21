import { TMusicContent } from "../types/music-content";
import PostFailure from "../components/post-failure";
import PostSucess from "../components/post-sucess";
import { TPost } from "../types/post";
import { textSpanContainsPosition } from "typescript";

const sendPost = async (post: TPost) => {
  return new Promise(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/makepost`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          post: post,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status == 201) {
          resolve(true);
        } else reject(false);
      });
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });
};

export default sendPost;

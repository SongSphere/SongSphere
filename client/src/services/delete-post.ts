import { TPost } from "../types/post";
import { textSpanContainsPosition } from "typescript";

const deletePost = async (post: TPost) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/removepost`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        post: post,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      console.log(res.json());
    });
  } catch (err) {
    console.log(err);
  }
};

export default deletePost;

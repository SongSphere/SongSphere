import { TPost } from "../../types/post";

const deletePost = async (post: TPost) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/api/removepost`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        post: post,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        resolve(true);
      })
      .catch((error) => {
        resolve(false);
      });
  });
};

export default deletePost;

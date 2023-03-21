import { TPost } from "../../types/post";

const getPost = async (post: TPost) => {
  const result = await fetch(`${process.env.REACT_APP_API}/user/images`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default getPost;

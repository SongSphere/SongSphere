import { TMusicContent } from "../types/music-content";
import PostFailure from "../components/post-failure";
import PostSucess from "../components/post-sucess";
import { TPost } from "../types/post";
import { textSpanContainsPosition } from "typescript";

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

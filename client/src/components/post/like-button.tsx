import { useEffect, useState } from "react";
import styled from "styled-components";
import likePost from "../../services/user/like-post";
import unLikePost from "../../services/user/unlike-post";
import fetchLikes from "../../services/user/fetch-likes";
import likeComment from "../../services/post/like-comment";
import unLikeComment from "../../services/post/unlike-comment";

const LikedButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.25s ease;
  overflow: hidden;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewbox='0 0 100 100'><path fill='%23de3618' d='M50,88.87 C76.67,70.46 90,53.9 90,39.17 C90,17.08 63.12,3.84 50,27.63 C38.875,3.85 10,17.08 10,39.17 C10,53.9 23.33,70.46 50,88.87 Z'/></svg>");
  background-size: contain;
`;
const NotLikedButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.25s ease;
  overflow: hidden;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewbox='0 0 100 100'><path fill='none' stroke='%23666' stroke-width='5' d='M50,88.87 C76.67,70.46 90,53.9 90,39.17 C90,17.08 63.12,3.84 50,27.63 C38.875,3.85 10,17.08 10,39.17 C10,53.9 23.33,70.46 50,88.87 Z'/></svg>");
  background-size: contain;
`;

interface LikeButtonProps {
  id: string | undefined;
  type: string; // this can be "Post" or "Comment"
}

const likeHandler = (id: string, type: string) => {
  if (type == "Post") {
    likePost(id);
  } else if (type == "Comment") {
    likeComment(id);
  }
};

const unLikeHandler = (id: string, type: string) => {
  if (type == "Post") {
    unLikePost(id);
  } else if (type == "Comment") {
    unLikeComment(id);
  }
};

const LikeButton = (props: LikeButtonProps) => {
  const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    if (props.id) {
      fetchLikes(props.id).then((liked) => {
        setLiked(liked);
      });
    }
  }, []);

  if (liked) {
    return (
      <LikedButton
        onClick={() => {
          if (props.id) {
            unLikeHandler(props.id, props.type);
          }
        }}
      ></LikedButton>
    );
  } else {
    return (
      <NotLikedButton
        onClick={() => {
          if (props.id) {
            likeHandler(props.id, props.type);
          }
        }}
      ></NotLikedButton>
    );
  }
};
export default LikeButton;

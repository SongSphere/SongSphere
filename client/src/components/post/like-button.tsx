import { useEffect, useState } from "react";
import styled from "styled-components";

import likePost from "../../services/post/like-post";
import unLikePost from "../../services/post/unlike-post";

import likeComment from "../../services/post/like-comment";
import unLikeComment from "../../services/post/unlike-comment";

import fetchPostLiked from "../../services/post/fetch-post-liked";
import fetchCommentLiked from "../../services/post/fetch-comment-liked";

import fetchPostLikes from "../../services/post/fetch-post-likes";
import fetchCommentLikes from "../../services/post/fetch-comment-likes";
import Session from "../../session";
import { TNotification } from "../../types/notification";
import sendNotification from "../../services/notification/send-notification";

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
  postUserEmail: string;
}

const LikeButton = (props: LikeButtonProps) => {
  const [liked, setLiked] = useState<boolean | null>(null);
  const [likes, setLikes] = useState(0);

  const likeHandler = async (id: string) => {
    if (props.type == "Post") {
      await likePost(id);
      const user = Session.getUser();
      if (user) {
        const notificationForAlerts: TNotification = {
          userEmailSender: user.email,
          userEmailReceiver: props.postUserEmail,
          notificationType: "Like",
          text: `${user.username} liked your post!`,
        };
        await sendNotification(notificationForAlerts);
      }
    } else if (props.type == "Comment") {
      await likeComment(id);
      const user = Session.getUser();
      if (user) {
        const notificationForAlerts: TNotification = {
          userEmailSender: user.email,
          userEmailReceiver: props.postUserEmail,
          notificationType: "Like",
          text: `${user.username} liked your comment!`,
        };
        await sendNotification(notificationForAlerts);
      }
    }
    await updateLiking(id);
  };

  const unLikeHandler = async (id: string) => {
    if (props.type == "Post") {
      await unLikePost(id);
    } else if (props.type == "Comment") {
      await unLikeComment(id);
    }
    await updateLiking(id);
  };

  const updateLiking = (id: string) => {
    if (props.type === "Post") {
      fetchPostLiked(id).then((liked) => {
        setLiked(liked);

        fetchPostLikes(id).then((likes) => {
          setLikes(likes);
        });
      });
    } else if (props.type === "Comment") {
      fetchCommentLiked(id).then((liked) => {
        setLiked(liked);
        fetchCommentLikes(id).then((likes) => {
          setLikes(likes);
        });
      });
    }
  };

  useEffect(() => {
    if (props.id) {
      updateLiking(props.id);
    }
  }, []);

  if (liked) {
    return (
      <div className="flex">
        {likes}
        <LikedButton
          onClick={async () => {
            if (props.id) {
              await unLikeHandler(props.id);
            }
          }}
        ></LikedButton>
      </div>
    );
  } else {
    return (
      <div className="flex">
        {likes}
        <NotLikedButton
          onClick={() => {
            if (props.id) {
              likeHandler(props.id);
            }
          }}
        ></NotLikedButton>
      </div>
    );
  }
};
export default LikeButton;

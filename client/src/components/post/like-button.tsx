import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { TPost } from "../../types/post";
import LikePost from "../../services/user/like-post";
import UnlikePost from "../../services/user/unlike-post";
import fetchLikes from "../../services/user/fetch-likes";
import Session from "../../session";
import { TUser } from "../../types/user";
import { TNotification } from "../../types/notification";
import sendNotification from "../../services/notification/send-notification";
import { TComment } from "../../types/comment";

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
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    if (props.id) {
      fetchLikes(props.id).then((liked) => {
        setLiked(liked);
      });
    }

    const user = Session.getUser();
    setUser(user);
  }, []);

  if (liked && props.id) {
    console.log(props.id);
    return <LikedButton onClick={async () => UnlikePost(props.id)} />;
  } else {
    return <NotLikedButton onClick={async () => {
      console.log("clicked");
      LikePost(props.id);
      const user = Session.getUser();
      if (user) {
        const notificationForAlerts: TNotification = {
          userEmailSender: user.email,
          userEmailReceiver: props.postUserEmail,
          notificationType: "Like",
          text: `${user.username} liked your post!`,
        };
        console.log(notificationForAlerts);
  
        await sendNotification(notificationForAlerts);
      }
      
    }
      
      
    } />;
  }
};
export default LikeButton;

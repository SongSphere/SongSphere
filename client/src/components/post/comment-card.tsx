import { useState } from "react";
import sendNotification from "../../services/notification/send-notification";
import likeComment from "../../services/post/like-comment";
import sendComment from "../../services/post/send-comment";
import unLikeComment from "../../services/post/unlike-comment";
import { TComment } from "../../types/comment";
import { TNotification } from "../../types/notification";
import { TPopulatedComment } from "../../types/populated-comment";
import { TUser } from "../../types/user";

interface ICommentCardProps {
  comment: TPopulatedComment;
  user: TUser;
}

const CommentCard = (props: ICommentCardProps) => {
  const nestedComments = props.comment.subComments.map((comment) => {
    return (
      <div key={comment._id}>
        <CommentCard comment={comment} user={props.user} />
      </div>
    );
  });

  return (
    <div className="px-4 py-4 mb-2 w-fit">
      <div className="flex">
        <div className="">
          <img
            className="w-12 h-12 border-2 rounded-full"
            src={props.comment.profileImgUrl}
          ></img>
        </div>
        <div className="ml-2">
          <a href={`/user/${props.user.username}`}>
            <div className="font-bold">{props.comment.username}</div>
          </a>
          <div>{props.comment.text}</div>
          {nestedComments}
        </div>
        <button
          onClick={async () => {
            likeComment(props.comment._id);
            // send notification
            const notificationForAlerts: TNotification = {
              userEmailSender: props.user.email,
              userEmailReceiver: props.comment.userEmail,
              notificationType: "Like",
              text: `${props.user.username} liked your Comment!`,
            };
            console.log(notificationForAlerts);

            await sendNotification(notificationForAlerts);
          }}
        >
          like
        </button>
        <button
          onClick={() => {
            unLikeComment(props.comment._id);
          }}
        >
          unlike
        </button>
      </div>
    </div>
  );
};

export default CommentCard;

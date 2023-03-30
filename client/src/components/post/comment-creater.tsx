import { useState } from "react";
import sendNotification from "../../services/notification/send-notification";
import sendComment from "../../services/post/send-comment";
import { TComment } from "../../types/comment";
import { TNotification } from "../../types/notification";
import { TUser } from "../../types/user";

interface ICommentCreatorProp {
  user: TUser;
  id: string;
  commentType: string; // this can be "Post" or "Comment"
  commentChanged: number;
  setCommentChanged: React.Dispatch<React.SetStateAction<number>>;
  creator: string;
}

const CommentCreater = (props: ICommentCreatorProp) => {
  let [commentContent, setCommentContent] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        let res = false;
        if (props.user && commentContent !== "") {
          const comment: TComment = {
            username: props.user.username,
            userEmail: props.user.email,
            text: commentContent,
            subComments: [],
            like: 0,
          };

          if (props.commentType === "Post") {
            res = await sendComment(comment, props.id, "");
            const notificationForAlerts: TNotification = {
              userEmailSender: props.user.email,
              userEmailReceiver: props.creator,
              notificationType: "Comment",
              text: `${props.user.username} commented on your post!`,
            };
            await sendNotification(notificationForAlerts);
          } else if (props.commentType === "Comment") {
            res = await sendComment(comment, "", props.id);
            const notificationForAlerts: TNotification = {
              userEmailSender: props.user.email,
              userEmailReceiver: props.creator,
              notificationType: "Comment",
              text: `${props.user.username} commented on your comment!`,
            };

            await sendNotification(notificationForAlerts);
          }
        }

        if (res) {
          setCommentContent("");
          props.setCommentChanged(props.commentChanged + 1);
        }
      }}
    >
      <label>
        <div className="flex px-2">
          <img
            className="w-12 h-12 border rounded-full"
            src={props.user.profileImgUrl}
          ></img>
          <input
            className="w-full pl-4 mx-2 border rounded-full"
            type="text"
            placeholder="Type ur comment here!"
            name="name"
            value={commentContent}
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
          />
        </div>
      </label>
    </form>
  );
};

export default CommentCreater;

import { useState } from "react";
import sendComment from "../../services/post/send-comment";
import { TComment } from "../../types/comment";
import { TUser } from "../../types/user";

interface ICommentCardProps {
  comment: TComment;
  user: TUser;
}

const CommentCard = (props: ICommentCardProps) => {
  let [commentContent, setCommentContent] = useState("");

  return (
    <div className="px-4 py-4 mb-2 w-fit ">
      <div className="font-bold">{props.comment.username}</div>
      <div>{props.comment.text}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (props.user && props.comment._id && commentContent !== "") {
            const comment: TComment = {
              username: props.user.username,
              userEmail: props.user.email,
              text: commentContent,
              subComments: [],
            };

            console.log("sending comment");
            sendComment(comment, "", props.comment._id);
          }
        }}
      >
        <label>
          comment:
          <input
            type="text"
            name="name"
            value={commentContent}
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentCard;

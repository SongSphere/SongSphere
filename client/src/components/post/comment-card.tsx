import { useState } from "react";
import { TPopulatedComment } from "../../types/populated-comment";
import { TUser } from "../../types/user";
import CommentCreater from "./comment-creater";
import LikeButton from "./like-button";

interface ICommentCardProps {
  comment: TPopulatedComment;
  user: TUser;
  commentChanged: number;
  setCommentChanged: React.Dispatch<React.SetStateAction<number>>;
}

const CommentCard = (props: ICommentCardProps) => {
  const nestedComments = props.comment.subComments.map((comment) => {
    return (
      <div key={comment._id}>
        <CommentCard
          comment={comment}
          user={props.user}
          commentChanged={props.commentChanged}
          setCommentChanged={props.setCommentChanged}
        />
      </div>
    );
  });

  const [subCommentCreator, setSubCommentCreator] = useState(false);

  return (
    <div className="w-full px-4 py-4 mb-2">
      <div className="flex">
        <img
          className="w-12 h-12 border-2 rounded-full"
          src={props.comment.profileImgUrl}
        ></img>
        <div className="ml-2">
          <a href={`/user/${props.user.username}`}>
            <div className="font-bold">{props.comment.username}</div>
          </a>
          <div>{props.comment.text}</div>
          <div className="flex">
            <LikeButton
              id={props.comment._id}
              postUserEmail={props.comment.userEmail}
              type="Comment"
            />
            <div
              className="w-6 h-6 mt-1 ml-2 cursor-pointer"
              onClick={() => {
                setSubCommentCreator(!subCommentCreator);
              }}
            >
              <img src="/img/icons/comment.svg"></img>
            </div>
          </div>
        </div>
      </div>
      {subCommentCreator ? (
        <CommentCreater
          user={props.user}
          id={props.comment._id}
          commentType="Comment"
          commentChanged={props.commentChanged}
          setCommentChanged={props.setCommentChanged}
          commentCreatorEmail={props.comment.userEmail}
        />
      ) : (
        <div></div>
      )}
      {nestedComments}
    </div>
  );
};

export default CommentCard;

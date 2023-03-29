import { TComment } from "../../types/comment";
import CommentCard from "./comment-card";

interface ICommentCardProps {
  comments: TComment[];
}

const CommentLoader = (props: ICommentCardProps) => {
  return (
    <div>
      {props.comments.map((comment) => {
        return <div>{comment.text}</div>;
      })}
    </div>
  );
};
export default CommentLoader;

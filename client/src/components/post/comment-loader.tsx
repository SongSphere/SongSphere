import { useEffect, useState } from "react";
import fetchCommentById from "../../services/post/fetch-comment-by-id";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import { TComment } from "../../types/comment";
import { TPopulatedComment } from "../../types/populated-comment";
import { TUser } from "../../types/user";
import CommentCard from "./comment-card";

interface ICommentCardProps {
  comments: TComment[];
  user: TUser;
  commentChanged: number;
  setCommentChanged: React.Dispatch<React.SetStateAction<number>>;
}

const CommentLoader = (props: ICommentCardProps) => {
  const [comments, setComments] = useState<TPopulatedComment[] | null>(null);

  const renderComment = async (comment: TComment) => {
    if (comment == null) {
      return null;
    }
    const subCommentIds = comment.subComments;
    const subPopulatedComments: TPopulatedComment[] = [];
    let populatedComment: TPopulatedComment;

    if (subCommentIds) {
      for (let i = 0; i < subCommentIds.length; i++) {
        const subCommentId = subCommentIds[i];
        const subComment = await fetchCommentById(subCommentId);
        const subPopulatedComment = await renderComment(subComment);
        if (subPopulatedComment) {
          subPopulatedComments.push(subPopulatedComment);
        }
      }
    }

    const user = await fetchUserByUsername(comment.username);

    populatedComment = {
      _id: comment?._id!,
      username: comment.username,
      profileImgUrl: user.profileImgUrl,
      userEmail: comment.userEmail,
      text: comment.text,
      subComments: subPopulatedComments,
    };

    return populatedComment;
  };

  const renderComments = async (comments: TComment[]) => {
    let populatedComments: TPopulatedComment[] = [];
    for (let i = 0; i < comments.length; i++) {
      const populatedComment = await renderComment(comments[i]);
      if (populatedComment) {
        populatedComments.push(populatedComment);
      }
    }
    return populatedComments;
  };

  useEffect(() => {
    if (props.comments) {
      renderComments(props.comments).then((comments) => {
        setComments(comments);
      });
    }
  }, [props.comments]);

  if (!comments) {
    return <div>comments fetching</div>;
  }

  return (
    <div>
      {comments.map((comment) => {
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
      })}
    </div>
  );
};
export default CommentLoader;

import { useEffect, useState } from "react";
import fetchCommentById from "../../services/post/fetch-comment-by-id";
import fetchSubComments from "../../services/post/fetch-sub-comments";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import { TComment } from "../../types/comment";
import { TUser } from "../../types/user";
import CommentCard from "./comment-card";

interface ICommentCardProps {
  comments: TComment[];
  user: TUser;
}

interface IPopulatedComment {
  _id: string;
  username: string;
  profileImgUrl: string;
  userEmail: string;
  text: string;
  subComments: IPopulatedComment[];
}

const CommentLoader = (props: ICommentCardProps) => {
  const [comments, setComments] = useState<IPopulatedComment[] | null>(null);

  const renderComment = async (comment: TComment) => {
    if (comment == null) {
      return null;
    }
    const subCommentIds = comment.subComments;
    const subPopulatedComments: IPopulatedComment[] = [];
    let populatedComment: IPopulatedComment;

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

    const profileImgUrl = (await fetchUserByUsername(comment.username))
      .profileImgUrl;

    populatedComment = {
      _id: comment?._id!,
      username: comment.username,
      profileImgUrl: profileImgUrl,
      userEmail: comment.userEmail,
      text: comment.text,
      subComments: subPopulatedComments,
    };

    return populatedComment;
  };

  // const renderSubComments = async (comments: TComment[]) => {
  //   // console.log("comment length", comments.length);
  //   if (comments.length == 0) return;
  //   let populatedComments: IPopulatedComment[] = [];
  //   for (let i = 0; i < comments.length; ++i) {
  //     const comment = comments[i];
  //     console.log(comment);
  //     if (comment._id) {
  //       const subComments = await fetchSubComments(comment._id);
  //       let populatedSubComments = await renderSubComments(subComments);
  //       if (!populatedSubComments) {
  //         populatedSubComments = [];
  //       }
  //       const profileImgUrl = (await fetchUserByUsername(comment.username))
  //         .profileImgUrl;

  //       const populatedComment: IPopulatedComment = {
  //         _id: comment._id,
  //         username: comment.username,
  //         profileImgUrl: profileImgUrl,
  //         userEmail: comment.userEmail,
  //         text: comment.text,
  //         subComments: populatedSubComments,
  //       };

  //       populatedComments.push(populatedComment);
  //     }
  //   }
  //   return populatedComments;
  // };

  const renderComments = async (comments: TComment[]) => {
    let populatedComments: IPopulatedComment[] = [];
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
      // renderSubComments(props.comments).then((d) => {
      //   console.log("populated data ", d);
      // });
    }
  }, []);

  useEffect(() => {
    if (comments) {
      console.log(comments);
    }
  }, [comments]);

  return (
    <div>
      {props.comments.map((comment) => {
        return (
          <div key={comment._id}>
            <CommentCard comment={comment} user={props.user} />
          </div>
        );
      })}
    </div>
  );
};
export default CommentLoader;

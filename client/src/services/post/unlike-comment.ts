import { TComment } from "../../types/comment";

const unLikeComment = async (comment: TComment) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/api/user/updateUnlikeComment`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              comment: comment,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

    } catch (error) {
        
    }

}

export default unLikeComment;
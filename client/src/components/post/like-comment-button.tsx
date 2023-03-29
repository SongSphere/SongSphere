import { useEffect, useState } from "react";
import likeComment from "../../services/post/like-comment";
import unLikeComment from "../../services/post/unlike-comment";
import { TComment } from "../../types/comment";


interface LikeCommentButtonProps {
    comment: TComment;
    
}

const LikeCommentButton = (props: LikeCommentButtonProps) => {

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // fetchLikes(props.comment._id).then((likes) => {
        //     setLiked(likes.includes(props.user._id));
        // });
    }, []);

    return (
        <div>
            {liked ? (
                <button
                    onClick={async () => {
                        try {
                            await unLikeComment(props.comment);
                            setLiked(false);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                    
                > Unlike comment </button>
            ) : (
                <button
                    onClick={async () => {
                        try {
                            await likeComment(props.comment);
                            setLiked(true);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >like comment </button>
            )}
        </div>
    );
};

export default LikeCommentButton;
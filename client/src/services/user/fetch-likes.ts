import { TPost } from "../../types/post";

const FetchLikes = async (
    postId: TPost,
): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        await fetch(`${process.env.REACT_APP_API}/api/user/fetchisLiked${postId._id}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .catch((error) => {
              reject(error);
            });
    });
};
export default FetchLikes
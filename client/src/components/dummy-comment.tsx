import sendComment from "../services/post/send-comment";
import fetchUser from "../services/user/fetch-user";
//import { appleAuth } from "../services/apple/apple-music-link";
import { TComment } from "../types/comment";
import fetchComments from "../services/post/fetch-comments";
import fetchSubComments from "../services/post/fetch-sub-comments";

const Comment = () => {
  return (
    <div>
      <button
        className="p-2 bg-blue-400 rounded-md"
        onClick={async () => {
          try {
            const comment: TComment = {
              username: "anthonyfmb",
              userEmail: "anthonyfbaumann@gmail.com",
              text: "testing subcomments wow",
              subComments: [],
            };
            await sendComment(
              comment,
              "64244e18a49f3fa743896a21",
              "64244f78a49f3fa743896a5c"
            );
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Test Comment
      </button>
      <button
        className="p-2 bg-blue-400 rounded-md"
        onClick={async () => {
          try {
            let comments = await fetchComments("641ccfc61581404785800928");
            console.log(comments);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Test Fetch
      </button>
      <button
        className="p-2 bg-blue-400 rounded-md"
        onClick={async () => {
          try {
            let comments = await fetchSubComments("64244f78a49f3fa743896a5c");
            console.log(comments);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Test Fetch Subcomments
      </button>
    </div>
  );
};

export default Comment;

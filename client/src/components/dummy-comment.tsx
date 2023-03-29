import sendComment from "../services/post/send-comment";
import fetchUser from "../services/user/fetch-user";
//import { appleAuth } from "../services/apple/apple-music-link";
import { TComment } from "../types/comment";

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
              text: "you are a hideous orangutan",
              subComments: [],
            };
            await sendComment(
              comment,
              "641ccfc61581404785800928",
              "6420e9af76577c8662d971e7"
            );
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Test Comment
      </button>
    </div>
  );
};

export default Comment;

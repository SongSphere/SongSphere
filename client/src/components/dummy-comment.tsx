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
              username: "Kyu",
              userEmail: "davidkimworks@gmail.com",
              text: "nice",
              subComments: [],
              like: 0,
            };
            await sendComment(
              comment,
              "64235c28d1e8139b6a9e53af",
              "64244faba49f3fa743896a60" // If the subcomment disappers the dummy doesn't work
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

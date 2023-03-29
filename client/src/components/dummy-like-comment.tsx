import likeComment from "../services/post/like-comment";
import unLikeComment from "../services/post/unlike-comment";
import { TComment } from "../types/comment";

const LikeCommentDummy = () => {
    return(
        <div>
            <button
                className="p-2 bg-red-400 rounded-md"
                onClick={async () => {
                    console.log("Like comment dummy pressed");
                    try {
                        const comment: TComment = {
                            _id: "64245d1ff2aeeed572f12030",
                            username: "kyu",
                            userEmail: "davidkimworks@gmail.com",
                            text: "nice",
                            like: 0,
                            subComments: [],
                        };

                        console.log("In components");
                        console.log(comment);

                        await likeComment(comment);
                    } catch (error) {
                        console.error(error);
                    }

                }}
                >

            </button>
            <div></div>
            <button
                className="p-2 bg-yellow-400 rounded-md"
                onClick={async () => {
                    console.log("unLike comment dummy pressed");
                    try {
                        const comment: TComment = {
                            _id: "64245d1ff2aeeed572f12030",
                            username: "kyu",
                            userEmail: "davidkimworks@gmail.com",
                            text: "nice",
                            like: 0,
                            subComments: [],
                        };

                        console.log("In components");
                        console.log(comment);

                        await unLikeComment(comment);
                    } catch (error) {
                        console.error(error);
                    }

                }}
                >

            </button>
         
        
        </div>
        
    );

};

export default LikeCommentDummy;

// export default LikeComment;

// // const Comment = () => {
// //   return (
// //     <div>
// //       <button
// //         className="p-2 bg-blue-400 rounded-md"
// //         onClick={async () => {
// //           try {
// //             const comment: TComment = {
            //   username: "anthonyfmsdfgdsfgb",
            //   userEmail: "anthonyfbaumann@gmail.com",
            //   text: "subcomments",
            //   subComments: [],
// //               like: 0,
// //             };
// //             await sendComment(
// //               comment,
// //               "641ccfc61581404785800928",
// //               "6420e9af76577c8662d971e7"
// //             );
// //           } catch (error) {
// //             console.error(error);
// //           }
// //         }}
// //       >
// //         Test Comment
// //       </button>
// //     </div>
// //   );
// // };

// // export default Comment;
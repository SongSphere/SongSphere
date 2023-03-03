import { TPost } from "../types/post";


const EditPost = async (
    post: TPost
  ): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        await fetch(`${process.env.REACT_APP_API}/api/editpost`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
           post: post
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          resolve(true);
        });
      } catch (err) {
        reject(err);
      }
    });
  };
  
  export default EditPost;
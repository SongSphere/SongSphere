import { useEffect } from "react";
import { useState } from "react";
import EditPost from "../services/post/edit-post";
import { useNavigate } from "react-router-dom";
import fetchUser from "../services/user/fetch-user";
import Popup from "reactjs-popup";
import { useParams } from "react-router-dom";
import fetchPostById from "../services/post/fetch-post-by-id";
import { TPost } from "../types/post";
import Session from "../session";

interface IEditPageProps {
  // selectEditPost: TPost | null;
  // setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const EditPage = (props: IEditPageProps) => {
  // if(props.post == null) {
  //     return (
  //         <div><h1>Error Post not Found</h1></div>
  //     );
  // }
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<TPost | null>(null);
  const closeModal = () => setOpen(false);
  const [successFailText, setSuccessFailText] = useState("");
  const [caption, setCaption] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPostById(id).then((post) => {
        setPost(post);
        setCaption(post.caption);
      });
    }
    // if (props.selectEditPost) {
    //   setCaption(props.selectEditPost.caption);
    // }
  }, []);

  if (!post) {
    return <div>fetching post</div>;
  }

  return (
    <div className="grid justify-center w-screen h-screen grid-cols-4 grid-rows-4 bg-navy">
      <div className="grid grid-cols-3 col-start-2 col-end-4 row-start-1 row-end-4 mt-10 rounded-lg bg-lgrey">
        <div className="col-span-2 text-center rounded-lg">
          {post.music.name}
          {post.music.artist ? " by " + post.music.artist : ""}
          <input
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            className="w-1/2"
            defaultValue={post.caption}
          />
          {/* <Link to="/profile"> */}
          <button
            className="p-2 text-sm rounded-full bg-lblue hover:bg-navy hover:text-lgrey"
            onClick={async () => {
              await EditPost({
                _id: post._id,
                username: post.username,
                userEmail: post.userEmail,
                caption: caption,
                music: post.music,
                comments: post.comments,
                likes: post.likes,
                repost: post.repost,
              })
                .then(async (res) => {
                  if (res) {
                    setSuccessFailText("Success");
                  } else {
                    setSuccessFailText("Fail");
                  }
                  setOpen(true);
                  setTimeout(() => {
                    navigate("/profile");
                  }, 1500);

                  Session.setUser(await fetchUser());
                })
                .catch((error) => {
                  setSuccessFailText("Fail");
                  setOpen(true);
                });
            }}
          >
            Submit
          </button>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="modal">
              <a className="close" onClick={closeModal}>
                &times;
              </a>
              {successFailText}
            </div>
          </Popup>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};
export default EditPage;

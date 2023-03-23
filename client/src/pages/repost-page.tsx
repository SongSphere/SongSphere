import { TPost } from "../types/post";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import fetchPostById from "../services/post/fetch-post-by-id";
import { useState } from "react";
import fetchUserByUsername from "../services/user/fetch-user-username";
import { TUser } from "../types/user";
import sendPost from "../services/post/send-post";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Session from "../session";
import fetchUser from "../services/user/fetch-user";



const RepostPage = () => {
    const [post, setPost] = useState<TPost | null>(null);
    const { id } = useParams();
    const [user, setUser] = useState<TUser | null>(null);
    const [caption, setCaption] = useState<string>("");
    const [successFailText, setSuccessFailText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
          fetchPostById(id).then((post) => {
            setPost(post);
          });
        }
      }, []); 
      if (!post) {
        return <div>fetching post</div>;
      }
      fetchUserByUsername(post.username).then((user) => {
        setUser(user);
      });
      if (!user) {
        return <div>fetching post</div>;
      }
    
    return (
        <div className="grid h-screen grid-cols-2 max-w-screen bg-lblue">
            
            <div className="w-5/6 mx-5 my-8 bg-white drop-shadow-md">
                <div className="flex w-full p-5 mb-5 bg-lgrey">
                    <div className="w-20 h-20 drop-shadow-md">
                        <img className="w-full h-full rounded-full" src={user.profileImgUrl}></img>
                    </div>
                    <p className="text-xl">Post by {post.username}</p>
                </div>
                <div className="flex justify-center col-span-1">
                    <img src={post.music.cover}></img>
                </div>
                <div className="flex justify-center mt-5 text-xl text-navy">
                    {post.music.name}{" "}
                    {post.music.artist ? " by " + post.music.artist : ""}
                </div>
                <div className="flex justify-center text-lg text-navy">
                    {post.caption}
                </div>
            </div>
            <div className="flex flex-col content-center justify-center h-full my-5 mt-8">
                <div className="w-4/5 text-center bg-white h-1/2">
                    <p className="mt-5 text-lg text-navy">Enter Your Caption</p>
                    <form className="mx-3 border-2 border-solid border-navy bg-lgrey h-1/2">
                        <label >
                        <input
                            className="w-full h-full bg-lgrey"
                            type="text"
                            value={caption}
                            onChange={(e) => {
                            setCaption(e.target.value);
                            }}
                        />
                        </label>
                    </form>
                    <button
                        className="p-2 my-5 rounded-md text-lgrey bg-navy hover:bg-lblue"
                        onClick={async () => {
                        if (user) {
                            const newPost: TPost = {
                            username: post.username + ";" + user.username,
                            userEmail: user.email,
                            caption: post.caption + ";" + caption,
                            music: post.music,
                            likes: 0,
                            repost: true,
                            };
                           await (sendPost(newPost))
                           .then(async (res) => {
                            if (res) {
                              setSuccessFailText("Success");
                            } else {
                              setSuccessFailText("Fail");
                            }
                            setTimeout(() => {
                              navigate("/profile");
                            }, 1500);
          
                            Session.setUser(await fetchUser());
                          })
                          .catch((error) => {
                            setSuccessFailText("Fail");
                            
                          });
                        }
                        }}
                    >
                        Repost
                    </button>
                </div>
                
            </div>
            
        </div>
        
    );
};
export default RepostPage
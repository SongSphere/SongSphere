import React from "react";
import { useState } from "react";
import { TPost } from "../types/post";
import { TUser } from "../types/user";
import EditPost from "../services/edit-post";
import { Link } from "react-router-dom";
import fetchUser from "../services/fetch-user";

interface IEditPageProps {
    selectEditPost: TPost | null;
    setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  }

const EditPage = (props:IEditPageProps) => {
    // if(props.post == null) {
    //     return (
    //         <div><h1>Error Post not Found</h1></div>
    //     );
    // }
    const [caption, setCaption] = useState<string>("");
    return (

        <div className="grid justify-center w-screen h-screen grid-cols-4 grid-rows-4 bg-navy">
            
            <div className="grid grid-cols-3 col-start-2 col-end-4 row-start-1 row-end-4 mt-10 rounded-lg bg-lgrey">
            <div className="col-span-2 text-center rounded-lg">
                {props.selectEditPost?.music.name} 
                {props.selectEditPost?.music.artist ?(' by ' + props.selectEditPost?.music.artist) :("")}
                <input value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
              
            }}
                className="w-1/2"
          defaultValue={props.selectEditPost?.caption} 
          />
          <Link to="/profile">
                <button className="p-2 text-sm rounded-full bg-lblue hover:bg-navy hover:text-lgrey"
                onClick={async () => {

                    await EditPost({
                        _id: props.selectEditPost?._id,
                        username: props.selectEditPost?.username!,
                        userEmail: props.selectEditPost?.userEmail!,
                        caption:caption,
                        music: props.selectEditPost?.music!,
                    }).then(async () => {
                        props.setUser(await fetchUser())
                    });

                }}>
                    Sumbit 
                </button>
                </Link>
            </div>
            
            </div> 
        </div>
    );
} ;
export default EditPage
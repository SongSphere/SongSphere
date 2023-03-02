import React from "react";
import { TPost } from "../types/post";
import { TUser } from "../types/user";

interface IEditPageProps {
    post: TPost | null;
  }

const EditPage = (props:IEditPageProps) => {
    if(props.post == null) {
        return (
            <div><h1>Error Post not Found</h1></div>
        );
    }
    return (
        <div className="bg-navy">
            <div className="bg-lgrey">
            <div className="pl-4 text-lg text-navy">{props.post.music.name} {props.post.music.artist ?(' by ' + props.post.music.artist) :("")}</div>
            <input className="w-1/2"
          placeholder={props.post.caption}
          
            />
            </div>
        </div>
    );
} ;
export default EditPage
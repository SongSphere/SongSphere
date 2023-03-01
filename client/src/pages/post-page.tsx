import React from "react";
import ReactDOM from "react";
import Search from "../components/search";
import { TUser } from "../types/user";
import { Link } from "react-router-dom";

interface IPostPageProps {
  musicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
  service: string;
}

const PostPage = (props: IPostPageProps) => {
  return (
    //page container
    <div className="grid justify-center w-screen h-screen grid-cols-4 grid-rows-4 bg-navy">
      <div className="grid grid-cols-3 col-start-2 col-end-4 row-start-1 row-end-4 rounded-lg bg-lgrey">
        <div className="col-span-2 rounded-lg">

        <Link className="p-5" to="/">
          
          <button type="button" className="inline-flex items-center justify-center p-2 mt-5 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Close menu</span>
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            </Link>
          <Search musicInstance={props.musicInstance} user={props.user} />
          
        </div>
        
      </div>
    </div>
  );
};

export default PostPage;

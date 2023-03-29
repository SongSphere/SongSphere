import Search from "../components/post/search-song";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { useState } from "react";
import { TMusicContent } from "../types/music-content";
import { useEffect } from "react";

interface IPostPageProps {
  musicInstance: MusicKit.MusicKitInstance;
}

const PostPage = (props: IPostPageProps) => {
  const {song} = useParams();
  return (
    <div className="w-screen h-full min-h-screen bg-lblue max-w-[100%]">
      <Navbar />
      <Link className="absolute right-5 top-12" to="/">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 mt-5 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
        </Link>
      <div className="w-screen  max-w-[100%] h-screen bg-lblue">
        {
          
          song ? (
            <Search musicInstance={props.musicInstance} song={song}/>
          ): <Search musicInstance={props.musicInstance} />
        }
        
      </div>
            
    </div>
  );
};

export default PostPage;

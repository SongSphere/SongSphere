import React from "react";
import ReactDOM from "react";
import Search from "../components/search";

const PostPage = () => {
  return (
    //page container
    <div className="grid justify-center w-screen h-screen grid-cols-4 grid-rows-4 bg-navy">
      <div className="grid grid-cols-3 col-start-2 col-end-4 row-start-1 row-end-4 rounded-lg bg-lgrey">
        <div className="col-span-2 rounded-lg">
          <Search />
        </div>
        <div className="col-span-1 rounded-lg"></div>
      </div>
    </div>
  );
};

export default PostPage;

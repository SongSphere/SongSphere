// import packages
import { useRoutes } from "react-router-dom";

// import pages
import HomePage from "../pages/home-page";
import PostPage from "../pages/post-page";
import ProfilePage from "../pages/profile-page";

import Search from "./search";

interface IProtectedRouterProps {
  musicInstance: MusicKit.MusicKitInstance;
}

const ProtectedRouter = (props: IProtectedRouterProps) => {
  let element = useRoutes([
    { path: "/", element: <HomePage musicInstance={props.musicInstance} /> },
    { path: "/posts", element: <PostPage /> },
    {
      path: "/profile",
      element: <ProfilePage musicInstance={props.musicInstance} />,
    },
    {
      path: "/testsearch",
      element: <Search musicInstance={props.musicInstance} />,
    },
  ]);

  return element;
};

export default ProtectedRouter;

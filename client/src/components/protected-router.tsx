// import packages
import { useRoutes } from "react-router-dom";

// import pages
import AuthPage from "../pages/auth-page";
import HomePage from "../pages/home-page";
import OnBoardPage from "../pages/onboard-page";
import PostPage from "../pages/post-page";
import ProfilePage from "../pages/profile-page";

interface IRouterProps {
  musicInstance: MusicKit.MusicKitInstance;
}

const Router = (props: IRouterProps) => {
  let element = useRoutes([
    { path: "/", element: <HomePage musicInstance={props.musicInstance} /> },
    { path: "/posts", element: <PostPage /> },
    {
      path: "/profile",
      element: <ProfilePage musicInstance={props.musicInstance} />,
    },
  ]);

  return element;
};

export default Router;

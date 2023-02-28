// import packages
import { useRoutes } from "react-router-dom";

// import pages
import AuthPage from "../pages/auth-page";
import HomePage from "../pages/home-page";
import OnBoardPage from "../pages/onboard-page";
import PostPage from "../pages/post-page";
import ProfilePage from "../pages/profile-page";
import { TUser } from "../types/user";

interface IRouterProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  user: TUser | null;
}

const Router = (props: IRouterProps) => {
  console.log("router: ", props.user);

  let element = useRoutes([
    {
      path: "/auth",
      element: (
        <AuthPage setIsLoggedIn={props.setIsLoggedIn} setUser={props.setUser} />
      ),
    },
    {
      path: "/",
      element: (
        <HomePage
          appleMusicInstance={props.appleMusicInstance}
          setUser={props.setUser}
          setIsLoggedIn={props.setIsLoggedIn}
          user={props.user}
        />
      ),
    },
    { path: "/posts", element: <PostPage /> },
    {
      path: "/profile",
      element: <ProfilePage musicInstance={props.appleMusicInstance} />,
    },
    {
      path: "/onboard",
      element: (
        <OnBoardPage
          setUser={props.setUser}
          user={props.user}
          appleMusicInstance={props.appleMusicInstance}
        />
      ),
    },
  ]);

  return element;
};

export default Router;

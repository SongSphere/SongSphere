// import packages
import { useRoutes } from "react-router-dom";

// import pages
import AuthPage from "../pages/auth-page";
import HomePage from "../pages/home-page";
import OnBoardPage from "../pages/onboard-page";
import PostPage from "../pages/post-page";
import ProfilePage from "../pages/profile-page";
import SettingsPage from "../pages/settings-page";
import { TUser } from "../types/user";

interface IRouterProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  user: TUser | null;
}

/**
 * This sets all the routes for each pages
 *
 */

const Router = (props: IRouterProps) => {
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
    {
      path: "/posts",
      element: (
        <PostPage musicInstance={props.appleMusicInstance} user={props.user} />
      ),
    },
    {
      path: "/profile",
      element: (
        <ProfilePage
          setUser={props.setUser}
          setIsLoggedIn={props.setIsLoggedIn}
          musicInstance={props.appleMusicInstance}
          user={props.user}
        />
      ),
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
    {
      path: "/settings",
      element: (
        <SettingsPage
          user={props.user}
          setUser={props.setUser}
          setIsLoggedIn={props.setIsLoggedIn}
          appleMusicInstance={props.appleMusicInstance}
        />
      ),
    },
  ]);

  return element;
};

export default Router;

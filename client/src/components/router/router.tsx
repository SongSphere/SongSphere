// import packages
import { useRoutes } from "react-router-dom";

// import pages
import AuthPage from "../../pages/auth-page";
import HomePage from "../../pages/home-page";
import OnBoardPage from "../../pages/onboard-page";
import PostPage from "../../pages/post-page";
import ProfilePage from "../../pages/profile/profile-page";
import SearchUsersPage from "../../pages/search-users-page";
import SettingsPage from "../../pages/settings-page";
import { TUser } from "../../types/user";
import { TPost } from "../../types/post";
import EditPage from "../../pages/edit-page";
import OtherUserProfilePage from "../../pages/profile/other-user-profile-page";

interface IRouterProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  selectedUser: TUser | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  service: string;
  post: TPost | null;
  selectEditPost: TPost | null;
  setSelectEditPost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

/**
 * This sets all the routes for each pages
 *
 */

const Router = (props: IRouterProps) => {
  let element = useRoutes([
    {
      path: "/auth",
      element: <AuthPage />,
    },
    {
      path: "/",
      element: <HomePage appleMusicInstance={props.appleMusicInstance} />,
    },
    {
      path: "/posts",
      element: <PostPage musicInstance={props.appleMusicInstance} />,
    },
    {
      path: "/searchUsers",
      element: (
        <SearchUsersPage
          appleMusicInstance={props.appleMusicInstance}
        />
      ),
    },
    {
      path: "/user/:username",
      element: (
        <OtherUserProfilePage
          appleMusicInstance={props.appleMusicInstance}
        />
      ),
    },
    {
      path: "/profile",
      element: (
        <ProfilePage
          appleMusicInstance={props.appleMusicInstance}
          setSelectEditPost={props.setSelectEditPost}
        />
      ),
    },
    {
      path: "/onboard",
      element: <OnBoardPage appleMusicInstance={props.appleMusicInstance} />,
    },
    {
      path: "/settings",
      element: <SettingsPage appleMusicInstance={props.appleMusicInstance} />,
    },
    {
      path: "/edit/:id",
      element: (
        <EditPage />
      ),
    },
  ]);
  return element;
};

export default Router;

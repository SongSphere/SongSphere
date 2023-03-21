// import packages
import { useRoutes } from "react-router-dom";

// import pages
import AuthPage from "../pages/auth-page";
import HomePage from "../pages/home-page";
import OnBoardPage from "../pages/onboard-page";
import PostPage from "../pages/post-page";
import ProfilePage from "../pages/profile-page";
import SearchUsersPage from "../pages/search-users-page";
import SettingsPage from "../pages/settings-page";
import { TUser } from "../types/user";
import { TPost } from "../types/post";
import EditPage from "../pages/edit-page";
import OtherUserProfilePage from "../pages/other-user-profile-page";
import Session from "../session";

interface IRouterProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  selectedUser: TUser | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  post: TPost | null;
  selectEditPost: TPost | null;
  setSelectEditPost: React.Dispatch<React.SetStateAction<TPost | null>>;
}

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
          // user={props.user}
          // setUser={props.setUser}
          // selectedUser={props.selectedUser}
          // setSelectedUser={props.setSelectedUser}
          // setIsLoggedIn={props.setIsLoggedIn}
          appleMusicInstance={props.appleMusicInstance}
          // service={props.service}
        />
      ),
    },
    {
      path: "/user/:username",
      element: (
        <OtherUserProfilePage
          // user={props.user}
          // setIsLoggedIn={props.setIsLoggedIn}
          appleMusicInstance={props.appleMusicInstance}
          // service={props.service}
          // setSelectEditPost={props.setSelectEditPost}
        />
      ),
    },
    {
      path: "/profile",
      element: (
        <ProfilePage
          appleMusicInstance={props.appleMusicInstance}
          // service={props.service}
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
    // {
    //   path: "/edit",
    //   element: (
    //     <EditPage
    //       setUser={props.setUser}
    //       selectEditPost={props.selectEditPost}
    //     />
    //   ),
    // },
  ]);
  return element;
};

export default Router;

// import packages
import { useRoutes } from "react-router-dom";

// import pages
import AuthPage from "../pages/auth-page";
import HomePage from "../pages/home-page";
import OnBoardPage from "../pages/onboard-page";
import PostPage from "../pages/post-page";
import SearchUsersPage from "../pages/search-users-page";
import SettingsPage from "../pages/settings-page";
import EditPage from "../pages/edit-page";
import ProfilePage from "../pages/profile/profile-page";
import OtherUserProfilePage from "../pages/profile/other-user-profile-page";
import NotificationPage from "../pages/notification-page";
import RepostPage from "../pages/repost-page";
import LikesPage from "../pages/likes-page";

interface IRouterProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
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
      path: "/notificationsPage",
      element: (
        <NotificationPage appleMusicInstance={props.appleMusicInstance} />
      ),
    },
    {
      path: "/posts",
      element: <PostPage musicInstance={props.appleMusicInstance} />,
    },
    {
      path: "/searchUsers",
      element: (
        <SearchUsersPage appleMusicInstance={props.appleMusicInstance} />
      ),
    },
    {
      path: "/user/:username",
      element: (
        <OtherUserProfilePage appleMusicInstance={props.appleMusicInstance} />
      ),
    },
    {
      path: "/profile",
      element: <ProfilePage appleMusicInstance={props.appleMusicInstance} />,
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
      element: <EditPage />,
    },
    {
      path: "/repost/:id",
      element: <RepostPage />,
    },
    {
      path: "/likes",
      element: (
        <LikesPage />
      ),
    },
  ]);
  return element;
};

export default Router;

// import packages
import { useRoutes } from "react-router-dom";

// import pages
import AuthPage from "../pages/auth-page";
import HomePage from "../pages/home-page";
import OnBoardPage from "../pages/onboard-page";
import PostPage from "../pages/post-page";
import SearchUsersPage from "../pages/search-users-page";
// import SettingsPage from "../pages/settings-page";
import EditPage from "../pages/edit-page";
import ProfilePage from "../pages/profile/profile-page";
import OtherUserProfilePage from "../pages/profile/other-user-profile-page";
import NotificationPage from "../pages/notification-page";
import RepostPage from "../pages/repost-page";
import FollowRequestPage from "../pages/follow-request-page";
import LikesPage from "../pages/likes-page";
import RecentsPage from "../pages/recents-page";
import PlaylistPage from "../pages/playlist-page";
import CreateRoomPage from "../pages/party/enter-room-page";
import PartyPage from "../pages/party/party-page";
import SettingsPage from "../pages/settings-page";
import Page404 from "../components/party-room/404";
import PageBlocked from "../components/party-room/blocked-page";
import Ended from "../components/party-room/ended";

const Router = () => {
  let element = useRoutes([
    {
      path: "/auth",
      element: <AuthPage />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/404",
      element: <Page404 />,
    },
    {
      path: "/notificationsPage",
      element: <NotificationPage />,
    },
    {
      path: "/posts/:song?",
      element: <PostPage />,
    },
    {
      path: "/searchUsers",
      element: <SearchUsersPage />,
    },
    {
      path: "/user/:username",
      element: <OtherUserProfilePage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/onboard",
      element: <OnBoardPage />,
    },
    {
      path: "/settings",
      element: <SettingsPage />,
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
      path: "/followRequest",
      element: <FollowRequestPage />,
    },
    {
      path: "/likes",
      element: <LikesPage />,
    },
    {
      path: "/recents",
      element: <RecentsPage />,
    },
    {
      path: "/playlist",
      element: <PlaylistPage />,
    },
    {
      path: "/createRoom",
      element: <CreateRoomPage />,
    },
    {
      path: "/party/:id",
      element: <PartyPage />,
    },
    {
      path:"/party/blocked",
      element: <PageBlocked />,
    },
    {
      path:"/party/ended",
      element: <Ended />,
    },
  ]);
  return element;
};

export default Router;

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

interface IRouterProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  selectedUser: TUser | null;
  setSelectedUser:  React.Dispatch<React.SetStateAction<TUser | null>>;
  user: TUser | null;
  service: string;
  post: TPost | null;
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
        <PostPage
          musicInstance={props.appleMusicInstance}
          user={props.user}
          service={props.service}
        />
      ),
    },
    {
      path: "/profile",
      element: (
        <ProfilePage
          user={props.user}
          setUser={props.setUser}
          setIsLoggedIn={props.setIsLoggedIn}
          appleMusicInstance={props.appleMusicInstance}
          service={props.service}
        />
      ),
    },
    {
      path: "/searchUsers",
      element: (
        <SearchUsersPage
          user={props.user}
          setUser={props.setUser}
          selectedUser={props.selectedUser}
          setSelectedUser={props.setSelectedUser}
          setIsLoggedIn={props.setIsLoggedIn}
          appleMusicInstance={props.appleMusicInstance}
          service={props.service}
        />
      ),
    },
    {
      path: "/otherUsersProfilePage",
      element: (
        <OtherUserProfilePage 
        appleMusicInstance={props.appleMusicInstance}
        user={props.selectedUser} // Going to the user that the master user selected
        setUser={props.setUser}
        setIsLoggedIn={props.setIsLoggedIn}
        service={props.service}
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
    {
      path: "/edit",
      element: (
        <EditPage
          post={props.post}
        />
      ),
    },
  ]);

  return element;
};

export default Router;

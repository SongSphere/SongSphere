import { useRoutes } from "react-router-dom";
import AuthPage from "../pages/auth-page";
import HomePage from "../pages/home-page";
import OnBoardPage from "../pages/onboard-page";
import PostPage from "../pages/post-page";
import ProfilePage from "../pages/profile-page";
import SettingsPage from "../pages/settings-page";

/**
 * This sets all the routes for each pages
 * 
 */

export default function Router() {
 
  let element = useRoutes([
    { path: "/auth", element: <AuthPage /> },
    { path: "/", element: <HomePage /> },
    { path: "/posts", element: <PostPage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/onboard", element: <OnBoardPage />},
    { path: "/settings", element: <SettingsPage />}
  ]);

  return element;
}

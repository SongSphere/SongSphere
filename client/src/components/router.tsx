// import packages
import { useRoutes } from "react-router-dom";

// import pages
import AuthPage from "../pages/auth-page";
import HomePage from "../pages/home-page";
import PostPage from "../pages/post-page";
import ProfilePage from "../pages/profile-page";

export default function Router() {
  let element = useRoutes([
    { path: "/auth", element: <AuthPage /> },
    { path: "/", element: <HomePage /> },
    { path: "/posts", element: <PostPage /> },
    { path: "/profile", element: <ProfilePage /> },
  ]);

  return element;
}

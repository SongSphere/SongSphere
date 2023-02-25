import { useRoutes } from "react-router-dom";
import AuthPage from "../pages/auth-page";
import HomePage from "../pages/home-page";
import PostPage from "../pages/post-page";

export default function Router() {
  let element = useRoutes([
    { path: "/auth", element: <AuthPage/> },
    { path: "/", element: <HomePage /> },
    { path: "/posts", element: <PostPage /> },

  ]);

  return element;
}
// import packages
import { useContext, useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { TUser, userSessionContext } from "../context/userSessionContext";


// import pages
import AuthPage from "../pages/auth-page";
import HomePage from "../pages/home-page";
import OnBoardPage from "../pages/onboard-page";
import PostPage from "../pages/post-page";
import ProfilePage from "../pages/profile-page";


type UserInfo = {
  user: TUser | null;
};


export default function Router(props: UserInfo) {
 

  let element = useRoutes([
    { path: "/auth", element: <AuthPage /> },
    { path: "/", element: <HomePage /> },
    { path: "/posts", element: <PostPage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/onboard", element: <OnBoardPage />}

  ]);

  return element;
}

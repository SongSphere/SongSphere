import AuthPage from "./pages/auth-page";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DummyAuth from "./components/dummy-auth";
import PostPage from "./pages/post-page";
import Navbar from "./components/nav-bar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HomePage from "./pages/home-page";
import Router from "./components/router";


export default function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
        <BrowserRouter>
        <Router />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

<<<<<<< HEAD
import AuthPage from "./pages/auth-page";
=======
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DummyAuth from "./components/dummy-auth";
import PostPage from "./components/pages/post-page";
import Navbar from "./components/pages/nav-bar";
>>>>>>> posting-page

export default function App() {
  return (
<<<<<<< HEAD
    <div>
      <AuthPage />
    </div>
=======
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<DummyAuth />} />
            <Route path="home" element={<DummyAuth />} />
            <Route path="post" element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
>>>>>>> posting-page
  );
}
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);


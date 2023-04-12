import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import handleSignout from "../services/user/handle-sign-out";
import Session from "../session";

interface INavbarProps {}

// Navbar deeply inspired from: https://www.section.io/engineering-education/creating-a-responsive-navigation-bar-using-tailwind-css-and-javascript/

const Navbar = (props: INavbarProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const active = window.location.href.split("/")[3];

  return (
    <nav className="shadow-lg bg-slate-800">
      <div className="w-screen px-4 mx-auto">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center px-2 py-4">
                {/* <img src="logo.png" alt="Logo" className="w-8 h-8 mr-2" /> */}
                <span className="text-lg font-semibold text-slate-200">
                  SongSphere
                </span>
              </a>
            </div>
            {/* primary navbar items */}
            <div className="items-center hidden space-x-1 lg:flex">
              <Link
                to="/"
                className="font-semibold text-slate-200 hover:text-sky-300"
              >
                <div
                  className={
                    active == "" ? "border-b-4 border-sky-300 text-sky-300" : ""
                  }
                >
                  <div className="px-2 py-4">Home</div>
                </div>
              </Link>

              <Link
                to="/followRequest"
                className="font-semibold text-slate-200 hover:text-sky-300"
              >
                <div
                  className={
                    active == "followRequest"
                      ? "border-b-4 border-sky-300 text-sky-300"
                      : ""
                  }
                >
                  <div className="px-2 py-4">Follow Request</div>
                </div>
              </Link>

              <Link
                to="/profile"
                className="font-semibold text-slate-200 hover:text-sky-300"
              >
                <div
                  className={
                    active == "profile"
                      ? "border-b-4 border-sky-300 text-sky-300"
                      : ""
                  }
                >
                  <div className="px-2 py-4">Profile</div>
                </div>
              </Link>

              <Link
                to="/searchUsers"
                className="font-semibold text-slate-200 hover:text-sky-300"
              >
                <div
                  className={
                    active == "searchUsers"
                      ? "border-b-4 border-sky-300 text-sky-300"
                      : ""
                  }
                >
                  <div className="px-2 py-4">Search</div>
                </div>
              </Link>

              <Link
                to="/posts"
                className="font-semibold text-slate-200 hover:text-sky-300"
              >
                <div
                  className={
                    active == "posts"
                      ? "border-b-4 border-sky-300 text-sky-300"
                      : ""
                  }
                >
                  <div className="px-2 py-4">Post</div>
                </div>
              </Link>

              <Link
                to="/notificationsPage"
                className="font-semibold text-slate-200 hover:text-sky-300"
              >
                <div
                  className={
                    active == "notificationsPage"
                      ? "border-b-4 border-sky-300 text-sky-300"
                      : ""
                  }
                >
                  <div className="px-2 py-4">Notification</div>
                </div>
              </Link>

              <Link
                to="/createRoom"
                className="font-semibold text-slate-200 hover:text-sky-300"
              >
                <div
                  className={
                    active == "createRoom"
                      ? "border-b-4 border-sky-300 text-sky-300"
                      : ""
                  }
                >
                  <div className="px-2 py-4">Party Room</div>
                </div>
              </Link>

              <Link
                to="/settings"
                className="font-semibold text-slate-200 hover:text-sky-300"
              >
                <div
                  className={
                    active == "settings"
                      ? "border-b-4 border-sky-300 text-sky-300"
                      : ""
                  }
                >
                  <div className="px-2 py-4">Settings</div>
                </div>
              </Link>
            </div>
          </div>
          <div className="items-center hidden space-x-3 lg:flex ">
            <div
              className="px-2 py-4 font-semibold cursor-pointer text-slate-200 border-sky-300 hover:text-sky-300"
              onClick={async () => {
                const logoutSuccesss = await handleSignout();
                if (logoutSuccesss) {
                  Session.setUser(null);
                  window.location.reload();
                }
              }}
            >
              Logout
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => {
                setMobileNavOpen(!mobileNavOpen);
              }}
            >
              <img
                className="w-8 h-8 mr-4"
                src="/img/icons/three-lines.svg"
              ></img>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navbar expanded */}
      {mobileNavOpen ? (
        <div className="items-center space-x-1 lg:hidden">
          <Link to="/">
            <div className="px-2 py-4 font-semibold border-b-4 border-sky-300 text-sky-300">
              Home
            </div>
          </Link>
          <Link to="/followRequest">
            <div className="px-2 py-4 font-semibold text-slate-200 border-sky-300 hover:text-sky-300">
              Follow Request
            </div>
          </Link>

          <Link to="/profile">
            <div className="px-2 py-4 font-semibold text-slate-200 border-sky-300 hover:text-sky-300">
              Profile
            </div>
          </Link>
          <Link to="/searchUsers">
            <div className="px-2 py-4 font-semibold text-slate-200 border-sky-300 hover:text-sky-300">
              Search
            </div>
          </Link>

          <Link to="/posts">
            <div className="px-2 py-4 font-semibold text-slate-200 border-sky-300 hover:text-sky-300">
              Post
            </div>
          </Link>
          <Link to="/notificationsPage">
            <div className="px-2 py-4 font-semibold text-slate-200 border-sky-300 hover:text-sky-300">
              Notification
            </div>
          </Link>
          <Link to="/createRoom">
            <div className="px-2 py-4 font-semibold text-slate-200 border-sky-300 hover:text-sky-300">
              Party Room
            </div>
          </Link>
          <Link to="/settings">
            <div className="px-2 py-4 font-semibold text-slate-200 border-sky-300 hover:text-sky-300">
              Settings
            </div>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import handleSignout from "../services/user/handle-sign-out";
import Session from "../session";

interface INavbarProps {}

const Navbar = (props: INavbarProps) => {
  return (
    <div className="relative z-10 h-16">
      <div className="fixed w-screen bg-white drop-shadow-md">
        <div className="flex flex-row justify-end">
          <Link className="p-5" to="/">
            Home
          </Link>
          <Link className="p-5" to="/profile">
            Profile
          </Link>
          <Link className="p-5" to="/searchUsers">
            Search
          </Link>

          <Link className="p-5" to="/posts">
            Post
          </Link>
          <Link className="p-5" to="/settings">
            Setting
          </Link>
          <button
            className="p-5"
            onClick={async () => {
              // If sign out success then set loggedin to false
              // Redirect to the authentication page
              const logoutSuccesss = await handleSignout();
              if (logoutSuccesss) {
                Session.setUser(null);
                window.location.reload();
              }
            }}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

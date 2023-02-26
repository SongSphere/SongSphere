import { Link } from "react-router-dom";

const NewNavbar = () => {
  return (
    <div className="relative h-16">
      <div className="fixed w-screen bg-white">
        <div className="flex flex-row justify-end">
          <Link className="p-5" to="/">
            Home
          </Link>
          <Link className="p-5" to="/profile">
            Profile
          </Link>
          <Link className="p-5" to="/posts">
            Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;

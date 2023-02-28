import { Link } from "react-router-dom";

const NewNavbar = () => {
  return (
    <div className="relative h-16">
      <div className="fixed flex justify-between w-screen p-5 bg-navy border-lg-lgrey">
        <div className="flex flex-row justify-end">
          <Link className="inline-block px-4 py-2 border rounded border-lgrey text-lgrey" to="/">
            Home
          </Link>
          <Link className="inline-block px-4 py-2 border rounded border-lgrey text-lgrey"to="/profile">
            Profile
          </Link>
          <Link className="inline-block px-4 py-2 border rounded border-lgrey text-lgrey" to="/posts">
            Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;

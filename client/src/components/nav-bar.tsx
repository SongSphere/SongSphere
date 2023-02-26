import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  
  return (
    <>
      <nav>
        <ul className="flex justify-between p-5 bg-navy border-lg-lgrey">
          <li className="mr-5">
            <Link  className="inline-block px-4 py-2 border rounded border-lgrey text-lgrey" to="/">Home</Link>
          </li>
          <li className="mr-5">
            <Link className="inline-block px-4 py-2 border rounded border-lgrey text-lgrey" to="/post">Post</Link>
          </li>
          <li className="mr-5">
            <Link className="inline-block px-4 py-2 border rounded border-lgrey text-lgrey" to="#">Profile</Link>
          </li>
          <li className="mr-5">
            <Link className="inline-block px-4 py-2 border rounded border-lgrey text-lgrey" to="#">Party Room</Link>
          </li>
          <li className="mr-5">
            <Link className="inline-block px-4 py-2 border rounded border-lgrey text-lgrey" to="#">Settings</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};
export default Navbar;
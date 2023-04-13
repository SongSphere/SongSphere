import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Session from "../../session";
import { TUser } from "../../types/user";

const Page404 = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState<TUser | null>(null);
 
  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="font-extrabold tracking-widest text-white text-9xl">
        404
      </h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span
            onClick={() => {
              navigate(`/`);
              if (user) user.partyRoom = "";
            }}
            className="relative block px-8 py-3 bg-[#1A2238] border border-current"
          >
            Go Home
          </span>
        </a>
      </button>
    </div>
  );
};

export default Page404;

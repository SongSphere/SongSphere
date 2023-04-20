import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Session from "../../session";
import { TUser } from "../../types/user";

const Ended = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState<TUser | null>(null);
 
  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-4xl font-extrabold tracking-widest text-white">
      This party has been ended by the owner
      </h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-white group active:text-yellow-300 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-white group-hover:translate-y-0 group-hover:translate-x-0"></span>

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

export default Ended;
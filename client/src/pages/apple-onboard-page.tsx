/*
  Author: David Kim
  this is a onboard page for apple, when success goes to home
*/

import { useContext } from "react";
import AppleLink from "../components/apple-link";
import { TUser, userSessionContext } from "../context/userSessionContext";



const AppleOnBoardPage = () => {
 
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
  useContext(userSessionContext);

  return (
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <h3 className="text-3xl text-gray-900 font-semibold">Welcome {user?.givenName}</h3>
        <div className="mt-6 text-xl leading-9">
          Let's connect your Apple Music account
        </div>
      </div>

      <div className="w-full sm:w-1/2 p-6">
        <img src="/img/onboard.png"></img>
      </div>

      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <AppleLink/>
      </div>
    </div>
  );
};

export default AppleOnBoardPage;

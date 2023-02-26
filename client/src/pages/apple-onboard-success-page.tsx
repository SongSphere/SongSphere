/*
  Author: David Kim
  this is a onboard success page for apple, when success goes to home
*/

import AppleLink from "../components/apple-link";
import { TUser } from "../context/userSessionContext";
import { useNavigate } from "react-router-dom";

type UserInfo = {
  user: TUser | null;
};

const AppleOnBoardSuccessPage = () => {

  let navigate = useNavigate();

  const handleNavigationToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <h3 className="text-3xl text-gray-900 font-semibold">Success</h3>
        <div className="mt-6 text-xl leading-9">Apple music is connected!</div>
      </div>

      <div className="w-full sm:w-1/2 p-6">
        <img src="/img/onboard.png"></img>
      </div>

      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <button onClick={handleNavigationToHome}>Next</button>
      </div>
    </div>
  );
};

export default AppleOnBoardSuccessPage;

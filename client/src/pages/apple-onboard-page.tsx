/*
  
  Author: David Kim
  this is a onboard page for spotify
*/

import AppleLink from "../components/apple-link-temp";
import { TUser } from "../context/userSessionContext";

type UserInfo = {
  user: TUser | null;
};

const AppleOnBoardPage = (props: UserInfo) => {
  console.log(props.user?.givenName);

  return (
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <h3 className="text-3xl text-gray-900 font-semibold">Welcome David</h3>
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

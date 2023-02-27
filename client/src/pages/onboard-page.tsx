/*
  Author: David Kim
  this is a onboard page for apple and spotify, when success goes to home
  Note: When connecting with Spotify, redirect back to Onboard is unstable(janky) just for documentation
*/

import { useContext, useEffect, useState } from "react";
import AppleLink from "../components/apple-link";
import SpotifyLinkButton from "../components/spotify-link";
import { TUser, userSessionContext } from "../context/userSessionContext";
import { useNavigate } from "react-router-dom";
import AdjustNamesLink from "../components/adjust-names-link";

/**
 * This class is the onboarding page
 * 
 * 1. If the user is a brand new user, they are directed to onboard page
 * 2. If the user is a returning user, they are directed to home page
 *
 */
const OnBoardPage = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);

  const [userName, setUserName] = useState<string>();
  const [middleName, setMiddleName] = useState<string>();


  let navigate = useNavigate();

  const handleNavigationToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    // Check if the user is logged in (after the page loads)
    // If they're not, redirect them to the homepage
    if (!isLoggedIn) {
      navigate("/auth");
    }

    console.log("useeffect called in onboard page");
  }, []);

  return (
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <h3 className="text-3xl text-gray-900 font-semibold">
          Welcome {user?.givenName}
        </h3>
        <div className="mt-6 text-xl leading-9">
          Let's connect your Apple Music or Spotify account
        </div>
      </div>

      <div className="w-full sm:w-1/2 p-6">
        <img src="/img/onboard.png"></img>
      </div>

      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <AppleLink />
        <SpotifyLinkButton />
    
        <input className="e-input" type="text" placeholder="Enter User Name" onChange={(e) => setUserName(e.target.value)} />
        <input className="e-input" type="text" placeholder="Enter Middle Name" onChange={(e) => setMiddleName(e.target.value)} />
        <AdjustNamesLink
          username={userName? userName : ""}
          givenName={user?.givenName ? user?.givenName : ""}
          middleName={middleName ? middleName : ""}
          familyName={user?.familyName ? user?.familyName : ""}
        />
        <button onClick={handleNavigationToHome}> Next </button>
      </div>
    </div>
  );
};

export default OnBoardPage;

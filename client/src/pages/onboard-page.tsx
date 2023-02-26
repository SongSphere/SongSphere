/*
  Author: David Kim
  this is a onboard page for apple and spotify, when success goes to home
*/

import { useContext, useEffect } from "react";
import AppleLink from "../components/apple-link";
import SpotifyLinkButton from "../components/spotify-link";
import { TUser, userSessionContext } from "../context/userSessionContext";
import { useNavigate } from "react-router-dom";


const OnBoardPage = () => {
 
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
  useContext(userSessionContext);

  let navigate = useNavigate();

  const handleNavigationToHome = () => {
    navigate("/");
  };



    useEffect(() => {
      // Check if the user is logged in (after the page loads)
      // If they're not, redirect them to the homepage
      if (!isLoggedIn) {
        navigate('/auth')
      }

      console.log("useeffect called in onboard page")
    },[])
  


  return (
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <h3 className="text-3xl text-gray-900 font-semibold">Welcome {user?.givenName}</h3>
        <div className="mt-6 text-xl leading-9">
          Let's connect your Apple Music or Spotify account
        </div>
      </div>

      <div className="w-full sm:w-1/2 p-6">
        <img src="/img/onboard.png"></img>
      </div>

      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <AppleLink/>
        <SpotifyLinkButton/>
        <button onClick={handleNavigationToHome}> Next </button>
      </div>
    </div>
  );
};

export default OnBoardPage;

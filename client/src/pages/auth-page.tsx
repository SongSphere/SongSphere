/*
  
  Author: David Kim
  this is a page for login/sign up page
*/

import LoginButton from "../components/google-login-button";

import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";



const AuthPage = () => {

  let navigate = useNavigate();

  const handleNavigationToHome = () => {
    navigate("/");
  };

  const handleNavigationToSpotify = () => {
    navigate("spotify");
  };

  return (
    <div className="flex justify-center w-screen h-screen bg-background place-items-center">
      <div className="flex flex-row w-4/5 bg-white h-4/5 rounded-xl">
        <div className="w-full p-4 sm:w-1/2">
          <div className="w-40 h-40">
            <img src="/img/SongSphere.png"></img>
          </div>
          <div className="flex flex-col justify-start pt-20 text-start">
            <div className="">Welcome back</div>
            <div>Continue with Google</div>
            <div>
              <div>
                <LoginButton/>
                <button onClick={() => handleNavigationToHome()}>
                  go to home
                </button>
                <div>

                </div>
                <button onClick={() => handleNavigationToSpotify()}>
                  go to spotify
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 sm:block"></div>
      </div>
    </div>
  );
};

export default AuthPage;

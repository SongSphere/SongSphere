import React from "react";
import { GoogleLogin } from "@react-oauth/google";

// import services
import handleLogin from "../services/handle-login";
import DummyLogin from "../components/dummy-login";

const AuthPage = () => {
  return (
    <div className="flex h-screen w-screen place-items-center justify-center bg-background">
      <div className="flex h-4/5 w-4/5 flex-row rounded-xl bg-white">
        <div className="flex w-1/2 flex-col justify-center text-center">
          <div className="text-4xl font-bold justify-center">Welcome back </div>
          <div className="text-center font-light pr-20">Continue With Google</div>
          <div className="pr-14">
            <button className="w-fit pt-6 px-8"><DummyLogin/></button>
          </div>
        </div>
        {/* <div className="w-1/2 rounded-xl bg-gray-200 bg-[url('https://wallpapercave.com/wp/wp6871302.png')]"></div> */}
        <div className="w-1/2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500" ></div>
      </div>
    </div>
  );
};

export default AuthPage;

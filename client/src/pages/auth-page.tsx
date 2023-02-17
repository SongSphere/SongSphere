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
          <div className="">hi</div>
          <div>hi</div>
          <div>
            <button className="w-fit px-2"><DummyLogin/></button>
          </div>
        </div>
        <div className="w-1/2 rounded-xl bg-gray-200 bg-[url('https://lh3.googleusercontent.com/a/AEdFTp6LDtlFlsOSWZstQy1jaYLjDcje3Y4uDY3VNXuR=s96-c')]"></div>
      </div>
    </div>
  );
};

export default AuthPage;

/*
  
  Author: David Kim
  this is a page for login/sign up page
*/

import DummyLogin from "../components/google-login-button";

const AuthPage = () => {
  return (
    //  This sets the background and bg-color
    <div className="
                    flex h-screen w-screen place-items-center justify-center bg-background  
                    lg:flex lg:h-screen lg:w-screen lg:place-items-center lg:justify-center lg:bg-background  
                    md:flex md:h-screen md:w-screen md:place-items-center md:justify-center md:bg-background
                    sm:flex sm:h-screen sm:w-screen sm:place-items-center sm:justify-center sm:bg-background
                  
                    ">
      {/* This sets the white rounded rectangle */}
      <div className="
                      flex h-4/5 w-4/5 flex-row rounded-xl bg-white
                      lg:flex lg:h-4/5 lg:w-4/5 lg:flex-row lg:rounded-xl lg:bg-white
                      md:flex md:h-4/5 md:w-4/5 md:flex-row md:rounded-xl md:bg-white
                      sm:flex sm:h-4/5 sm:w-4/5 sm:flex-row sm:rounded-xl sm:bg-white
                      
                      ">
        {/* Responsible for logo image design */}
        <div className="lg:relative lg:h-32 lg:w-32 lg:rounded-xl
                        md:relative md:h-32 md:w-32 md:rounded-xl">
          <div className="lg:absolute lg:left-0 lg:top-0 lg:h-64 lg:w-64 lg:rounded-xl
                          md:absolute md:left-0 md:top-0 md:h-60 md:w-60 md:rounded-xl
                          sm:h-40 sm:w-40">
            <img src="/img/SongSphere.png"></img>
          </div>
        </div>
        {/* flex box responsible wrapping for header, light text, and button */}
        <div className="lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:text-center lg:first-letter
                        md:flex md:w-1/2 md:flex-col md:justify-center md:text-center md:first-letter
                        ">
          <div className="lg:text-4xl lg:font-bold lg:justify-center
                          md:text-lg md:font-bold md:justify-center md:pr-16 
                          sm:text-sm sm:font-light sm:justify-center">Welcome back </div>
          <div className="lg:text-center lg:font-light lg:pr-36
                          md:text-center md:font-light md:pr-8">
            Continue With Google
          </div>
          <div className="lg:pr-16">
            <button className="lg:w-fit lg:pt-6 lg:justify-center 
                               md:w-fit md:pt-6 md:px-6">
              <DummyLogin />
            </button>
          </div>
        </div>
        {/* This is the gradient in the right side of the rounded rectangle */}
        <div className="lg:w-1/2 lg:rounded-xl lg:bg-gradient-to-r from-violet-500 to-fuchsia-500
                        md:w-3/4 md:rounded-xl md:bg-gradient-to-r from-violet-500 to-fuchsia-500 "></div>
      </div>
    </div>
  );
};

export default AuthPage;

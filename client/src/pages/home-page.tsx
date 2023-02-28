import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userSessionContext } from "../context/userSessionContext";
import handleSignout from "../services/handle-sign-out";

/* This is the homepage, anytime the user finishes onboarding or already a user they are directed here */

const HomePage = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
  useContext(userSessionContext);

  let navigate = useNavigate();

  
  useEffect(() => {
    // Checks for bad session ID, if it is redirect to authentication page
    if (!isLoggedIn) {
      navigate('/auth')
    }

  }, []);

  return (
    <div>
      <div>Home</div>
      <div>
      <button
        onClick={async () => {
          // If sign out success then set loggedin to false
          // Redirect to the authentication page
          const logoutSuccesss = await handleSignout();
          if (logoutSuccesss) {
            setUser(null);
            setIsLoggedIn(false);
            navigate('/auth')
          } 

        }}
      >
        logout
      </button>
      
      <button onClick={async () => {
          navigate('/settings')
      }}>
        Settings
      </button>

      </div>
    </div>
  );
};

export default HomePage;

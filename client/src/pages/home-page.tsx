import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppleLink from "../components/apple-link";
import SpotfiyLinkButton from "../components/spotify-link";
import { userSessionContext } from "../context/userSessionContext";
import handleSignout from "../services/handle-sign-out";

const HomePage = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
  useContext(userSessionContext);

  let navigate = useNavigate();

  
  useEffect(() => {
    // If the user is not logged in: Checks for bad session ID
    if (!isLoggedIn) {
      navigate('/auth')
    }

  }, []);

  return (
    <div>
      <div>Home</div>
      <AppleLink />
      <SpotfiyLinkButton />
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
      </div>
    </div>
  );
};

export default HomePage;

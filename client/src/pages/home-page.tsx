import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppleLink from "../components/apple-link";
import SpotfiyLinkButton from "../components/spotify-link";
import { userSessionContext } from "../context/userSessionContext";
import handleSignout from "../services/handle-sign-out";

const HomePage = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
  useContext(userSessionContext);

  let navigate = useNavigate();
  
  return (
    <div>
      <div>Home</div>
      <AppleLink />
      <SpotfiyLinkButton />
      <div>
      <button
        onClick={async () => {
          // If sign out success then set loggedin to false
          const logoutSuccesss = await handleSignout();
          if (logoutSuccesss) {
            setUser(null);
            setIsLoggedIn(false);
            navigate('/auth')
          }

          // setIsLoggedIn(false);
          
          // if (!isLoggedIn) {
          //   navigate('/auth')
          // }
          
        }}
      >
        logout
      </button>
      </div>
    </div>
  );
};

export default HomePage;

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppleLink from "../components/apple-link";
import SpotfiyLinkButton from "../components/spotify-link";
import { userSessionContext } from "../context/userSessionContext";
import handleSignout from "../services/handle-sign-out";

interface IHomePageProps {
  musicInstance: MusicKit.MusicKitInstance;
}

const HomePage = (props: IHomePageProps) => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(userSessionContext);

  return (
    <div>
      <div>Home</div>
      <AppleLink musicInstance={props.musicInstance} />
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
              window.location.reload();
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

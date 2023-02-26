import AppleLink from "../components/apple-link-temp";
import SpotfiyLinkButton from "../components/spotify-link-button";
import Search from "../components/search";
import LoginButton from "../components/google-login-button";

const HomePage = () => {
  return (
    <div>
      <div>Home</div>
      <AppleLink />
      <SpotfiyLinkButton />
      <Search />
    </div>
  );
};

export default HomePage;

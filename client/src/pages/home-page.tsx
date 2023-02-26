import AppleLink from "../components/apple-link-temp";
import SpotfiyLinkButton from "../components/spotify-link-button";
import PostPage from "./post-page";
import NewNavbar from "../components/new-navbar";
const HomePage = () => {
  return (
    <div>
      <div>Home</div>
      <AppleLink />
      <SpotfiyLinkButton />
      <NewNavbar />
    </div>
  );
};

export default HomePage;

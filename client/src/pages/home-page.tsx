import AppleLink from "../components/apple-link-temp";
import SpotfiyLinkButton from "../components/spotify-link-button";
import PostPage from "./post-page";
import NewNavbar from "../components/new-navbar";
import Search from "../components/search";
import LoginButton from "../components/google-login-button";
import { PostButtons } from "../components/random-button-test";

const HomePage = () => {
  return (
    <div>
      <div>Home</div>
      <AppleLink />
      <SpotfiyLinkButton />
      <NewNavbar />
      <PostButtons />
    </div>
  );
};

export default HomePage;

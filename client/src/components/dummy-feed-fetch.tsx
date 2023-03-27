import fetchUser from "../services/user/fetch-user";
//import { appleAuth } from "../services/apple/apple-music-link";
import { TUser } from "../types/user";
import fetchFeed from "../services/user/fetch-feed";

const FetchFeed = () => {
  return (
    <div>
      <button
        className="p-2 bg-red-400 rounded-md"
        onClick={async () => {
          try {
            await fetchFeed(0);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Fetch Feed
      </button>
    </div>
  );
};

export default FetchFeed;

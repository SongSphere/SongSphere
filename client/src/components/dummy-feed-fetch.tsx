import fetchUser from "../services/fetch-user";
import { appleAuth } from "../services/apple-music-link";
import { TUser } from "../types/user";
import fetchFeed from "../services/fetch-feed";

const FetchFeed = () => {
  return (
    <div>
      <button
        className="p-2 bg-red-400 rounded-md"
        onClick={async () => {
          try {
            await fetchFeed();
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

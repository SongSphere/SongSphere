import { useEffect, useState } from "react";
import Session from "../../session";
import { TUser } from "../../types/user";
import FollowerList from "./follower-list";
import FollowingList from "./following-list";

const MyFollowerCard = () => {
  let nFollowers = 0;
  let nFollowing = 0;

  const [user, setUser] = useState<TUser | null>(null);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [followerButtonText, setFollowerButtonText] = useState(
    `${nFollowers} followers`
  );
  const [followingButtonText, setFollowingButtonText] = useState(
    `${nFollowing} following`
  );

  const handleOpenFollowers = () => {
    if (openFollowing) {
      setOpenFollowing(false);
    }
    setOpenFollowers(!openFollowers);
  };

  const handleOpenFollowing = () => {
    if (openFollowers) {
      setOpenFollowers(false);
    }
    setOpenFollowing(!openFollowing);
  };

  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);

  useEffect(() => {
    if (user) {
      nFollowers = user.followers.length;
      nFollowing = user.following.length;
      setFollowerButtonText(`${nFollowers} followers`);
      setFollowingButtonText(`${nFollowing} following`);
    }
  }, [user]);

  if (!user) {
    return <div>fetching user data</div>;
  }

  return (
    <div>
      <div>
        <button
          className={`ml-3 px-2 text-sm py-2 rounded text-grey`}
          onClick={() => handleOpenFollowers()}
        >
          {followerButtonText}
        </button>

        <button
          className={`ml-3 px-2 text-sm py-2 rounded text-grey`}
          onClick={() => handleOpenFollowing()}
        >
          {followingButtonText}
        </button>

        {openFollowers ? (
          <div>
            <FollowerList user={user} />
          </div>
        ) : null}

        {openFollowing ? (
          <div>
            <FollowingList user={user} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyFollowerCard;

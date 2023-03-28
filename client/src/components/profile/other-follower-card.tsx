import { useEffect, useState } from "react";
import { TUser } from "../../types/user";
import Session from "../../session";
import fetchUser from "../../services/user/fetch-user";
import { follow, unfollow } from "../../services/follow/follow";
import FollowingList from "./following-list";
import FollowerList from "./follower-list";
import fetchUserByUsername from "../../services/user/fetch-user-username";

interface IOtherFollowerCard {
  selectedUser: TUser;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const OtherFollowerCard = (props: IOtherFollowerCard) => {
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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

  const handleClick = async () => {
    const user = Session.getUser();
    if (props.selectedUser && user) {
      if (!isFollowing) {
        follow(
          user.username,
          props.selectedUser.username
          // props.selectedUser.email
        ).then(async () => {
          Session.setUser(await fetchUser());
          props.setSelectedUser(
            await fetchUserByUsername(props.selectedUser.username)
          );
          setIsFollowing(true);
        });
      } else {
        unfollow(
          user.username,
          props.selectedUser.username
          // props.selectedUser.email
        ).then(async () => {
          Session.setUser(await fetchUser());
          props.setSelectedUser(
            await fetchUserByUsername(props.selectedUser.username)
          );
          setIsFollowing(false);
        });
      }
    }
  };

  useEffect(() => {
    const user = Session.getUser();
    if (props.selectedUser && user) {
      if (user.following.includes(props.selectedUser.username)) {
        setIsFollowing(true);
      }
      console.log(props.selectedUser.followers);
      console.log(props.selectedUser.following);
      setFollowers(props.selectedUser.followers);
      setFollowing(props.selectedUser.following);
    }
  }, [props.selectedUser]);

  if (!props.selectedUser) {
    return <div>fetching user data</div>;
  }

  return (
    <div>
      <div>
        {isFollowing ? (
          <button
            className={`ml-3 px-3 w-1/4 text-sm py-2 rounded text-white bg-slate-300`}
            onClick={() => handleClick()}
          >
            unfollow
          </button>
        ) : (
          <button
            className={`ml-3 px-3 w-1/4 text-sm py-2 rounded text-white bg-blue-500 `}
            onClick={() => handleClick()}
          >
            follow
          </button>
        )}

        <button
          className={`ml-3 px-2 text-sm py-2 rounded text-grey`}
          onClick={() => handleOpenFollowers()}
        >
          {followers.length} follower
        </button>

        <button
          className={`ml-3 px-2 text-sm py-2 rounded text-grey`}
          onClick={() => handleOpenFollowing()}
        >
          {following.length} following
        </button>

        {openFollowers ? (
          <div>
            <FollowerList user={props.selectedUser} />
          </div>
        ) : null}

        {openFollowing ? (
          <div>
            <FollowingList user={props.selectedUser} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OtherFollowerCard;

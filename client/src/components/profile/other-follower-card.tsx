import { useEffect, useState } from "react";
import { TUser } from "../../types/user";
import Session from "../../session";
import fetchUser from "../../services/user/fetch-user";
import { follow, unfollow } from "../../services/user/follow";
import FollowingList from "./following-list";
import FollowerList from "./follower-list";

interface IOtherFollowerCard {
  selectedUser: TUser | null;
}

const OtherFollowerCard = (props: IOtherFollowerCard) => {
  let nFollowers = 0;
  let nFollowing = 0;

  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [followerButtonText, setFollowerButtonText] = useState(
    `${nFollowers} followers`
  );
  const [followingButtonText, setFollowingButtonText] = useState(
    `${nFollowing} following`
  );
  const [following, setFollowing] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-blue-500");
  const [buttonText, setButtonText] = useState("Follow");

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
      if (!following) {
        setButtonColor("bg-lgrey");
        setButtonText("Unfollow");

        await follow(
          user.username,
          props.selectedUser.username,
          props.selectedUser.email
        ).then(async () => {
          Session.setUser(await fetchUser());
        });

        setFollowing(true);
      } else {
        setButtonColor("bg-blue-500");
        setButtonText("Follow");
        unfollow(
          user.username,
          props.selectedUser?.username!,
          props.selectedUser?.email!
        ).then(async () => {
          Session.setUser(await fetchUser());
        });

        setFollowing(false);
      }
    }
  };

  useEffect(() => {
    const user = Session.getUser();
    if (props.selectedUser && user) {
      if (user.following.includes(props.selectedUser.username)) {
        setFollowing(true);
        setButtonColor("bg-lgrey");
        setButtonText("Unfollow");
      }
      nFollowers = props.selectedUser.followers.length;
      nFollowing = props.selectedUser.following.length;
      setFollowerButtonText(`${nFollowers} followers`);
      setFollowingButtonText(`${nFollowing} following`);
    }
  }, [props.selectedUser]);

  if (!props.selectedUser) {
    return <div>fetching user data</div>;
  }

  return (
    <div>
      <div>
        <button
          className={`ml-3 px-3 w-1/4 text-sm py-2 rounded text-white ${buttonColor}`}
          onClick={() => handleClick()}
        >
          {buttonText}
        </button>

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

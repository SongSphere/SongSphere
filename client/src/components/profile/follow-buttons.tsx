import React, { useContext, useEffect, useState } from "react";
import fetchUser from "../../services/fetch-user";
import { follow, unfollow } from "../../services/follow";
import { TUser } from "../../types/user";

interface IUser {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

export const FollowButton = (props: IUser) => {
  const [buttonColor, setButtonColor] = useState("bg-blue-500");
  const [buttonText, setButtonText] = useState("Follow");

  let following: Boolean = false;

  useEffect(() => {
    if (props.user) {
      if (props.user.following.includes(props.user.email)) {
        console.log("yes following");
        setButtonColor("bg-lgrey");
        setButtonText("Unfollow");

        following = true;
      }
    }
  }, [props.user]);

  console.log(props.user?.followers);

  const handleClick = async () => {
    if (buttonColor === "bg-blue-500") {
      setButtonColor("bg-lgrey");
      setButtonText("Unfollow");
      await follow(props.user?.email!).then(async () => {
        props.setUser(await fetchUser());
      });
    } else {
      setButtonColor("bg-blue-500");
      setButtonText("Follow");
      unfollow(props.user?.email!).then(async () => {
        props.setUser(await fetchUser());
      });
    }
  };

  if (!props.user) {
    return <div>fetching user data</div>;
  }

  return (
    <button
      className={`ml-3 px-3 w-1/4 text-sm py-2 rounded text-white ${buttonColor}`}
      onClick={() => handleClick()}
    >
      {buttonText}
    </button>
  );
};

export const FollowersButton = (props: IUser) => {
  let nFollowers = 0;

  const [buttonText, setButtonText] = useState(`${nFollowers} followers`);

  useEffect(() => {
    if (props.user) {
      console.log(props.user.followers);
      nFollowers = props.user.followers.length;
      setButtonText(`${nFollowers} followers`);
    }
  }, [props.user]);

  const handleClick = async () => {};

  if (!props.user) {
    return <div>fetching user data</div>;
  }

  return (
    <button
      className={`ml-3 px-2 text-sm py-2 rounded text-grey`}
      onClick={() => handleClick()}
    >
      {buttonText}
    </button>
  );
};

export const FollowingButton = (props: IUser) => {
  let nFollowing = 0;

  const [buttonText, setButtonText] = useState(`${nFollowing} followers`);

  useEffect(() => {
    if (props.user) {
      nFollowing = props.user.following.length;
      setButtonText(`${nFollowing} following`);
    }
  }, [props.user]);

  const handleClick = async () => {};

  if (!props.user) {
    return <div>fetching user data</div>;
  }

  return (
    <button
      className={`ml-3 px-2 text-sm py-2 rounded text-grey`}
      onClick={() => handleClick()}
    >
      {buttonText}
    </button>
  );
};

export const ListFollowers = (props: IUser) => {
  let [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (props.user) {
      setUsers(props.user.followers);
    }
  }, [props.user]);

  if (!users) {
    return <div>fetching users</div>;
  }

  return (
    <div>
      {users.map((user) => {
        return <div>{user}</div>;
      })}
    </div>
  );

  return <div>hi</div>;
};

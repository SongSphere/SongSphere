import React, { useContext, useEffect, useState } from "react";
import fetchUser from "../../services/user/fetch-user";
import fetchUserName from "../../services/user/fetch-user-username";
import fetchUserNames from "../../services/user/fetch-usernames";
import { follow, unfollow } from "../../services/follow";
import { TUser } from "../../types/user";
import Session from "../../session";

interface IUser {
  user: TUser | null;
}

interface ISelectedUser {
  // user: TUser | null;
  // setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  selectedUser: TUser | null;
  // setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

export const MyFollowerInformationCard = (props: IUser) => {
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
    if (props.user) {
      nFollowers = props.user.followers.length;
      nFollowing = props.user.following.length;
      setFollowerButtonText(`${nFollowers} followers`);
      setFollowingButtonText(`${nFollowing} following`);
    }
  }, [props.user]);

  if (!props.user) {
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
            <ListFollowers user={props.user} />
          </div>
        ) : null}

        {openFollowing ? (
          <div>
            <ListFollowing user={props.user} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const OtherFollowerInformationCard = (props: ISelectedUser) => {
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
  // const [user, setUser] = useState<TUser | null>(null);

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

  // useEffect(() => {
  //   setUser(Session.getUser());
  // }, [Session.getUser()]);

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
            <ListFollowers
              user={props.selectedUser}
              // setUser={props.setSelectedUser}
            />
          </div>
        ) : null}

        {openFollowing ? (
          <div>
            <ListFollowing
              user={props.selectedUser}
              // setUser={props.setSelectedUser}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const ListFollowers = (props: IUser) => {
  let [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (props.user) {
      setUsers(props.user!.followers);
    }
  }, [props.user]);

  if (!users) {
    return <div>fetching users</div>;
  }

  return (
    <div className="mt-5 ml-5">
      {users.map((user) => {
        return (
          <div className="w-2/3 px-4 py-2 text-center rounded-lg bg-lgrey">
            {user}
          </div>
        );
      })}
    </div>
  );
};

export const ListFollowing = (props: IUser) => {
  let [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (props.user) {
      setUsers(props.user!.following);
    }
  }, [props.user]);

  if (!users) {
    return <div>fetching users</div>;
  }

  return (
    <div className="mt-5 ml-5">
      {users.map((user) => {
        return (
          <div className="w-2/3 px-4 py-2 text-center rounded-lg bg-lgrey">
            {user}
          </div>
        );
      })}
    </div>
  );
};

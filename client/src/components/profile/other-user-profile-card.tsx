import React, { useEffect, useState } from "react";
import fetchUser from "../../services/user/fetch-user";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import { follow, unfollow } from "../../services/follow/follow";
import Session from "../../session";
import { TUser } from "../../types/user";
import BlockUserModal from "./block-user-modal";

interface IProfileCardProps {
  selectedUser: TUser;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  followers: string[];
  setFollowers: Function;
  openFollowingModal: Function;
  openFollowersModal: Function;
}

const OtherUserProfileCard = (props: IProfileCardProps) => {
  const [open, setOpen] = React.useState(false);
  const [showBlockModal, setShowBlockModal] = React.useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleBlockOpen = () => {
    setShowBlockModal(true);
  };
  const handleBlockClose = () => {
    setShowBlockModal(false);
  };

  const handleOpenFollowers = () => {
    props.openFollowersModal();
  };

  const handleOpenFollowing = () => {
    props.openFollowingModal();
  };

  const handleFollowClick = async () => {
    const user = Session.getUser();

    if (props.selectedUser && user) {
      if (!isFollowing) {
        follow(user.username, props.selectedUser.username).then(async () => {
          Session.setUser(await fetchUser());
          const updatedUser = await fetchUserByUsername(
            props.selectedUser.username
          );
          props.setSelectedUser(updatedUser);
          props.setFollowers(updatedUser.followers);
          setIsFollowing(true);
        });
      } else {
        unfollow(user.username, props.selectedUser.username).then(async () => {
          Session.setUser(await fetchUser());
          const updatedUser = await fetchUserByUsername(
            props.selectedUser.username
          );
          props.setSelectedUser(updatedUser);
          props.setFollowers(updatedUser.followers);
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
    }

    console.log("followers: " + props.selectedUser.followers.toString());
  }, [props.selectedUser]);

  if (!props.selectedUser) {
    return <div>fetching user</div>;
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6 drop-shadow-md">
          <div className="relative w-full bg-gradient-to-tl from-purple-900 to-green-700 h-80">
            <img
              src={props.selectedUser.backgroundImgUrl}
              className="absolute object-cover w-full h-full mix-blend-overlay"
            />
            <div className="p-8">
              <div className="flex justify-center mt-8">
                <div className="w-32 h-32 drop-shadow-md">
                  <img
                    className="w-full h-full rounded-full"
                    src={props.selectedUser!.profileImgUrl}
                  ></img>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 dropdown">
            <button onClick={handleOpen} className="absolute py-2 right-3">
              <img width={20} src="https://i.stack.imgur.com/4MEQw.png" />
            </button>

            {open ? (
              <div className="w-1/2 p-2 text-center bg-gray-200 rounded-sm">
                <button onClick={handleBlockOpen} className="text-sm">
                  Block this user
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-6 text-2xl font-bold text-center text-black">{`${props.selectedUser.givenName} ${props.selectedUser.middleName} ${props.selectedUser.familyName}`}</div>
          <div className="text-center text-black">
            {props.selectedUser.username}
          </div>

          <div className="px-2 py-2">
            <div className="p-2 rounded-lg bg-lgrey">
              {isFollowing ? (
                <button
                  className={`ml-3 px-3 w-1/4 text-sm py-2 rounded text-white bg-slate-300`}
                  onClick={() => handleFollowClick()}
                >
                  unfollow
                </button>
              ) : (
                <button
                  className={`ml-3 px-2 w-1/4 text-sm py-2 rounded text-white bg-blue-500 `}
                  onClick={() => handleFollowClick()}
                >
                  follow
                </button>
              )}

              <button
                className={`ml-3 px-1 text-sm py-2 rounded text-gre hover:bg-gray-400`}
                onClick={() => handleOpenFollowers()}
              >
                {props.selectedUser.followers.length} followers
              </button>

              <button
                className={`ml-3 px-1 text-sm py-2 rounded text-grey hover:bg-gray-400`}
                onClick={() => handleOpenFollowing()}
              >
                {props.selectedUser.following.length} following
              </button>
            </div>
          </div>

          <BlockUserModal
            selectedUser={props.selectedUser}
            setSelectedUser={props.setSelectedUser}
            isVisible={showBlockModal}
            onClose={handleBlockClose}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfileCard;

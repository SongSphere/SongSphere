import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Session from "../../session";
import { TUser } from "../../types/user";
import fetchUser from "../../services/user/fetch-user";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import { follow, unfollow } from "../../services/follow/follow";
import BlockUserModal from "./block-user-modal";
import { TNotification } from "../../types/notification";
import sendNotification from "../../services/notification/send-notification";

interface IProfileCardProps {
  selectedUser: TUser;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  followers: string[];
  setFollowers: Function;
  openFollowingModal: Function;
  openFollowersModal: Function;
}

const OtherUserProfileCard = (props: IProfileCardProps) => {
  const [open, setOpen] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const user = Session.getUser();
  let navigate = useNavigate();

  const handleOpenFollowers = () => {
    props.openFollowersModal();
  };

  const handleOpenFollowing = () => {
    props.openFollowingModal();
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleBlockOpen = () => {
    setShowBlockModal(true);
  };
  const handleBlockClose = () => {
    setShowBlockModal(false);
  };

  useEffect(() => {
    const user = Session.getUser();

    if (props.selectedUser && user) {
      if (user.following.includes(props.selectedUser.username)) {
        setIsFollowing(true);
      }
    }
  }, [props.selectedUser]);

  if (!props.selectedUser) {
    return <div>fetching user</div>;
  }

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

          if (user.email !== props.selectedUser.email) {
            const notificationForAlerts: TNotification = {
              userEmailSender: user.email,
              userEmailReceiver: props.selectedUser.email,
              notificationType: "Follow",
              text: `${user.username} is now following you!`,
            };

            await sendNotification(notificationForAlerts);
          }
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

  if (!user) {
    return <div>fetching user data</div>;
  }

  return (
    <div className="w-full h-full">
      <div className="p-4 h-5/6 drop-shadow-md">
        <div className="relative font-bold text-white h-80">
          <img
            src={props.selectedUser.backgroundImgUrl}
            className="absolute object-cover w-full h-full rounded-lg mix-blend-overlay brightness-75"
          />
          <div className="p-8">
            <div className="flex justify-center mt-8">
              <div className="w-32 h-32 drop-shadow-md">
                <img
                  className="w-full h-full rounded-full"
                  src={props.selectedUser.profileImgUrl}
                ></img>
              </div>
            </div>
          </div>
          <div className="mt-6 text-2xl text-center">{`${props.selectedUser.givenName} ${props.selectedUser.middleName} ${props.selectedUser.familyName}`}</div>
          <div className="text-center">{props.selectedUser.username}</div>
        </div>
        <div className="pb-5 font-semibold text-white rounded-b-lg bg-slate-800">
          <div className="flex justify-center w-full pt-2 pb-2 font-bold">
            <button className="text-md" onClick={() => handleOpenFollowers()}>
              {props.selectedUser.followers.length} followers
            </button>
            <button
              className="ml-3 text-md"
              onClick={() => handleOpenFollowing()}
            >
              {props.selectedUser.following.length} following
            </button>
          </div>
          <div className="p-4 text-center">{props.selectedUser.biography}</div>
          <div className="flex justify-center">
            {isFollowing ? (
              <button
                className="px-4 py-2 text-sm text-white rounded bg-slate-500"
                onClick={() => handleFollowClick()}
              >
                unfollow
              </button>
            ) : (
              <button
                className="px-4 py-2 text-sm text-white rounded bg-sky-500"
                onClick={() => handleFollowClick()}
              >
                follow
              </button>
            )}
            <button
              className="px-4 py-2 ml-2 text-sm text-white bg-red-400 rounded"
              onClick={handleBlockOpen}
            >
              Block
            </button>
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

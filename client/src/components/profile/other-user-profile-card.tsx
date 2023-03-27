import React from "react";
import { TUser } from "../../types/user";
import BlockUserModal from "./block-user-modal";
import OtherFollowerCard from "./other-follower-card";

interface IProfileCardProps {
  selectedUser: TUser;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  user: TUser;
}

const OtherUserProfileCard = (props: IProfileCardProps) => {
  const [open, setOpen] = React.useState(false);
  const [showBlockModal, setShowBlockModal] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleBlockOpen = () => {
    setShowBlockModal(true);
  };
  const handleBlockClose = () => {
    setShowBlockModal(false);
  };

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
          <OtherFollowerCard
            selectedUser={props.selectedUser}
            setSelectedUser={props.setSelectedUser}
          />
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

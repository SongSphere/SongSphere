import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TUser } from "../../types/user";
import BlockUserModal from "./block-user-modal";
import { MyFollowerInformationCard } from "./follow-buttons";

interface IProfileCardProps {
  user: TUser;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  selectedUser: TUser | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const ProfileCard = (props: IProfileCardProps) => {
  const [showBlockModal, setShowBlockModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleBlockOpen = () => {
    setShowBlockModal(true);
  };
  const handleBlockClose = () => {
    setShowBlockModal(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  let navigate = useNavigate();

  return (
    <div className="flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6 drop-shadow-md">
          <div className="relative w-full bg-gradient-to-tl from-purple-900 to-green-700 h-80">
            <img
              src={props.user.backgroundImgUrl}
              className="absolute object-cover w-full h-full mix-blend-overlay"
            />
            <div className="p-8">
              <div className="flex justify-center mt-8">
                <div className="w-32 h-32 drop-shadow-md">
                  <img
                    className="w-full h-full rounded-full"
                    src={props.user.profileImgUrl}
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

          <div className="mt-6 text-2xl font-bold text-center text-black">{`${props.user.givenName} ${props.user.middleName} ${props.user.familyName}`}</div>
          <div className="text-center text-black">{props.user.username}</div>

          <div className="text-center">
            <button
              className="pt-6 rounded-full text-slate-500"
              onClick={() => {
                navigate("/settings");
              }}
            >
              edit
            </button>
          </div>
          <MyFollowerInformationCard
            user={props.user}
            setUser={props.setUser}
          />
          <BlockUserModal
            isVisible={showBlockModal}
            onClose={handleBlockClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

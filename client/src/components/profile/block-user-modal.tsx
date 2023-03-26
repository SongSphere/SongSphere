import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { block } from "../../services/user/block";
import { TUser } from "../../types/user";
import Session from "../../session";
import fetchUser from "../../services/user/fetch-user";

interface IBlockProps {
  selectedUser: TUser;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  isVisible: boolean;
  onClose: Function;
}

const BlockUserModal = (props: IBlockProps) => {
  let navigate = useNavigate();

  const handleOnClose = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "container") {
      console.log("TESTTSTST");
      props.onClose();
    }
  };

  const handleClick = async () => {
    const user = Session.getUser();

    if (props.selectedUser && user) {
      block(
        user.username,
        props.selectedUser.username,
        props.selectedUser.email
      ).then(async () => {
        Session.setUser(await fetchUser());
      });
    }
  };

  useEffect(() => {
    const user = Session.getUser();
  }, [props.selectedUser]);

  if (!props.selectedUser) {
    return <div>fetching user data</div>;
  }

  if (!props.isVisible) {
    return null;
  }

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="p-2 bg-white rounded w-72">
        <h1 className="text-center text-gray-700 text-md">
          Are you sure you want to block this user? You will no longer be able
          to view their profile.
        </h1>
        <div className="py-2 text-center">
          <button
            onClick={() => {
              handleClick();
              navigate("/");
            }}
            className="px-5 py-3 font-semibold text-white bg-red-700 rounded"
          >
            Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockUserModal;

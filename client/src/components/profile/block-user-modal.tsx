import React from "react";
import { useNavigate } from "react-router-dom";
import { block } from "../../services/block";

interface IBlockProps {
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
              //block();
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

import React, { useState } from "react";
import { follow, unfollow } from "../../services/follow";
import { TUser } from "../../types/user";

interface IUser {
  user: TUser | null;
}

export const FollowButton = (props: IUser) => {
  const [buttonColor, setButtonColor] = useState("bg-blue-500");
  const [buttonText, setButtonText] = useState("Follow");

  const handleClick = () => {
    if (buttonColor === "bg-blue-500") {
      setButtonColor("bg-lgrey");
      setButtonText("Unfollow");
      follow(props.user?.email!);
    } else {
      setButtonColor("bg-blue-500");
      setButtonText("Follow");
      unfollow(props.user?.email!);
    }
  };

  return (
    <button
      className={`ml-5 px-4 py-2 rounded text-white ${buttonColor}`}
      onClick={() => handleClick()}
    >
      {buttonText}
    </button>
  );
};

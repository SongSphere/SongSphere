import { TUser } from "../../types/user";
import { useEffect, useState } from "react";
import Session from "../../session";

interface IBlockedUsersProps {
  blockedUsers: string[];
}

const BlockedList = (props: IBlockedUsersProps) => {
  let blockedUsers: string[] = props.blockedUsers;

  return (
    <div className="mt-5 ml-5">
      {blockedUsers.map((user) => {
        return (
          <div className="w-2/3 px-4 py-2 text-center rounded-lg bg-lgrey">
            {user}
          </div>
        );
      })}
    </div>
  );
};

export default BlockedList;

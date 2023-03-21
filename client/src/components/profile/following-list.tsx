import { useEffect, useState } from "react";
import { TUser } from "../../types/user";

interface IFollowingListProps {
  user: TUser | null;
}

const FollowingList = (props: IFollowingListProps) => {
  let [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (props.user) {
      setUsers(props.user!.following);
    }
  }, [props.user]);

  if (!users) {
    return <div>fetching followings</div>;
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

export default FollowingList;

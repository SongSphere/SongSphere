import { TUser } from "../../types/user";
import { useEffect, useState } from "react";

interface IFollowerListProps {
  user: TUser | null;
}

const FollowerList = (props: IFollowerListProps) => {
  let [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (props.user) {
      setUsers(props.user!.followers);
    }
  }, [props.user]);

  if (!users) {
    return <div>fetching followers</div>;
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

export default FollowerList;

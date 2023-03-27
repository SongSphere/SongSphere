import React, { useEffect, useState } from "react";
import { unblock } from "../../services/user/block";
import fetchUser from "../../services/user/fetch-user";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import Session from "../../session";

interface IListBlockedUsers {
  blockedList: string[];
  isVisible: boolean;
  onClose: Function;
}

const BlockedList = (props: IListBlockedUsers) => {
  let [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  const handleOnClose = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "container") {
      props.onClose();
    }
  };

  const handleClick = async (selectedUsername: string) => {
    const user = Session.getUser();
    let selectedUser = await fetchUserByUsername(selectedUsername);

    if (user) {
      unblock(user.username, selectedUser.username, selectedUser.email).then(
        async () => {
          Session.setUser(await fetchUser());
        }
      );
    }

    props.onClose();
  };

  useEffect(() => {
    setBlockedUsers(props.blockedList);
  }, []);

  if (!props.isVisible) {
    return null;
  }

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="w-1/4 p-5 bg-white rounded h-1/2">
        <h1 className="py-3 font-semibold text-center text-gray-900 border-b-4 border-solid border-b-lgrey">
          Blocked Users
        </h1>

        <form>
          <div className="py-2">
            <div className="flex justify-between overflow-y-auto bg-white rounded-md shadow shadow-black/20">
              <input
                type="text"
                className="flex-1 block w-full px-3 py-2 focus:outline-none"
                placeholder="search blocked users"
                onChange={async (event) => {
                  // searching
                  let filteredUsers: Array<string> = Array<string>();

                  props.blockedList.forEach((u) => {
                    if (u.startsWith(event.target.value as string)) {
                      filteredUsers.push(u);
                    }
                  });

                  setBlockedUsers(filteredUsers);
                }}
              />
            </div>

            <div className="justify-center py-2 overflow-y-auto text-center min-h-screen/3">
              <div className="">
                {blockedUsers.map((user) => {
                  return (
                    <div className="flex">
                      <div className="flex-1 inline-block text-left">
                        {user}
                      </div>

                      <button
                        className="justify-end inline-block px-4 py-2 ml-auto text-center rounded-lg bg-lgrey"
                        key={user}
                        onClick={() => {
                          handleClick(user);
                        }}
                      >
                        unblock
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlockedList;

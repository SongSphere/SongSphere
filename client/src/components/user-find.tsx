import React, { useState } from "react";
import fetchUserName from "../services/fetch-userName";
import { TUser } from "../types/user";
import { useNavigate } from "react-router-dom";
import { TPost } from "../types/post";
import OtherUserProfilePage from "../pages/other-user-profile-page";

interface IUserFindProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  selectedUser: TUser | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  service: string;
}

const UserFind = (props: IUserFindProps) => {
  let [users, setUsers] = useState<TUser[]>([]);

  const navigate = useNavigate();

  return (
    <div className="flex justify-center min-h-screen overflow-hidden">
      <div className="">
        <div className="relative max-w-lg w-96">
          <form>
            <div className="flex justify-between overflow-hidden bg-white rounded-md shadow shadow-black/20">
              <input
                type="text"
                className="flex-1 block w-full px-3 py-2 focus:outline-none"
                placeholder="Search for users"
                onChange={async (event) => {
                  if ((event.target.value as string) == "") {
                    setUsers([]);
                  } else if ((event.target.value as string) != "") {
                    await fetchUserName(event.target.value as string).then(
                      (result) => {
                        if (result) {
                          setUsers(result);
                        } else {
                          setUsers([]);
                        }
                      }
                    );
                  }
                }}
              />
              <span className="inline-flex items-center px-2 py-2 m-1 rounded-md cursor-pointer bg-navy hover:bg-lblue">
                <svg
                  className="text-white"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z"
                  />
                </svg>
              </span>
            </div>
          </form>

          {users.length > 0 ? (
            users.map((user) => {
              return (
                <div key={user.email}>
                  <button
                    key={user.userName}
                    onClick={() => {
                      props.setUser(props.user);
                      props.setSelectedUser(user);
                      navigate("/otherUsersProfilePage");
                    }}
                  >
                    <div className="flex-1 block w-full px-3 py-2 mt-2 overflow-hidden bg-white rounded-md ">
                      <div className="inline-flex items-center">
                        <img
                          className="w-10 h-10 mr-4 rounded-full"
                          src={user.profileImgUrl}
                          alt="Avatar of Jonathan Reinink"
                        ></img>
                        <div className="text-sm">
                          <p className="pr-2 leading-none text-gray-900">
                            {user.userName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 cursor-pointer hover:bg-slate-100">
              <p className="text-sm font-medium text-gray-600">No User</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFind;

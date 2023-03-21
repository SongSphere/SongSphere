import React from "react";
import { SetStateAction } from "react";
import Navbar from "../components/navbar";
import SearchUserDropDown from "../components/seach-user-dropdown";
import { TUser } from "../types/user";


interface ISearchUsersProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  // user: TUser | null;
  // setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  // selectedUser: TUser | null;
  // setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  // setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  // service: string;
}

const SearchUsersPage = (props: ISearchUsersProps) => {
  return (
    <div className="fixed w-screen h-screen bg-navy">
      <Navbar />
      <div className="text-center translate-y-1/3">
        <h1 className="text-lg text-lgrey">Find Friends</h1>
        <SearchUserDropDown
          appleMusicInstance={props.appleMusicInstance}
          // service={props.service}
        />
      </div>
    </div>
  );
};

export default SearchUsersPage;

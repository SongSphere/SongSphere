import React from "react";
import { SetStateAction } from "react";
import Navbar from "../components/navbar";
import SearchUserDropDown from "../components/search/seach-user-dropdown";
import { TUser } from "../types/user";


interface ISearchUsersProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  selectedUser: TUser | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  service: string;
}

const SearchUsersPage = (props: ISearchUsersProps) => {
  return (
    <div className="fixed w-screen h-screen bg-navy">
      <Navbar
        setUser={function (value: SetStateAction<TUser | null>): void {
          throw new Error("Function not implemented.");
        }}
        setIsLoggedIn={function (value: SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="text-center translate-y-1/3">
        <h1 className="text-lg text-lgrey">Find Friends</h1>
        <SearchUserDropDown
          user={props.user}
          setUser={props.setUser}
          setIsLoggedIn={props.setIsLoggedIn}
          selectedUser={props.selectedUser}
          setSelectedUser={props.setSelectedUser}
          appleMusicInstance={props.appleMusicInstance}
          service={props.service}
        />
      </div>
    </div>
  );
};

export default SearchUsersPage;

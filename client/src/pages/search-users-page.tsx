
import { SetStateAction } from "react";
import Navbar from "../components/navbar";
import UserFind from "../components/user-find";
import { TUser } from "../types/user";;


interface ISearchUsersProps {
  musicInstance: MusicKit.MusicKitInstance;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  user: TUser | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


const SearchUsersPage = (props: ISearchUsersProps) => {
    return(
        <div className="fixed w-screen h-screen bg-navy">
            <Navbar setUser={function (value: SetStateAction<TUser | null>): void {
                throw new Error("Function not implemented.");
            } } setIsLoggedIn={function (value: SetStateAction<boolean>): void {
                throw new Error("Function not implemented.");
            } } />
            <div className="text-center translate-y-1/3">
                <h1 className="text-lg text-lgrey">Find Friends</h1>
                <UserFind user={props.user}/>
               
            </div>
        
        </div>
       
    );

}

export default SearchUsersPage;
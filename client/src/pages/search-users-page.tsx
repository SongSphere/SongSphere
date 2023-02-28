
import Navbar from "../components/navbar";
import { TUser } from "../types/user";

interface ISearchUsersProps {
  musicInstance: MusicKit.MusicKitInstance;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


const SearchUsersPage = (props: ISearchUsersProps) => {
    return(
        <div>
            Search users page
        </div>
    );

}

export default SearchUsersPage;
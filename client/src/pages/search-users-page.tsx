import Navbar from "../components/navbar";
import SearchUserDropDown from "../components/seach-user-dropdown";

interface ISearchUsersProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
}

const SearchUsersPage = (props: ISearchUsersProps) => {
  return (
    <div className="fixed w-screen h-screen bg-navy">
      <Navbar />
      <div className="text-center translate-y-1/3">
        <h1 className="text-lg text-lgrey">Find Friends</h1>
        <SearchUserDropDown appleMusicInstance={props.appleMusicInstance} />
      </div>
    </div>
  );
};

export default SearchUsersPage;

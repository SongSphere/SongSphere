import Navbar from "../components/navbar";
import SearchUserDropDown from "../components/seach-user-dropdown";

const SearchUsersPage = () => {
  return (
    <div className="fixed w-screen h-screen bg-navy">
      <Navbar />
      <div className="text-center translate-y-1/3">
        <h1 className="text-lg text-lgrey">Find Friends</h1>
        <SearchUserDropDown />
      </div>
    </div>
  );
};

export default SearchUsersPage;

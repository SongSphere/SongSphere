import FriendCard from "./user-card";

const FriendActivityCard = () => {
  return (
    <div className="relative flex justify-center h-screen">
      <div className="fixed flex h-full mt-8">
        <div className="bg-white w-80 h-5/6 drop-shadow-md">
          <h1 className="pt-5 pb-2 text-center text-gray-900 ">
            Friend Listening Activity
          </h1>
          <div className="w-5/6 mx-auto border-b-2 border-gray-300"></div>
          <div className="px-2"></div>
        </div>
      </div>
    </div>
  );
};

export default FriendActivityCard;

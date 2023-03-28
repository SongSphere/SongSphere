const FriendCard = () => {
  return (
    <div>
      <div className="flex-1 block w-full px-3 py-2 mt-2 overflow-hidden rounded-md bg-lgrey ">
        <div className="inline-flex items-center">
          <img
            className="w-10 h-10 mr-4 rounded-full"
            src={
              "https://lh3.googleusercontent.com/a/AGNmyxZI77XXY-zXNAirMHxFcFi9c_qJ7LeZPy9kgMgO7g=s96-c"
            }
            alt="Avatar of Jonathan Reinink"
          ></img>
          <div className="text-sm">
            <p className="py-1 pl-1 font-bold leading-none text-gray-900">
              {"domdan"}
            </p>
            <p className="pl-1 leading-none text-gray-900">
              {"listening to Quin XCL"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;

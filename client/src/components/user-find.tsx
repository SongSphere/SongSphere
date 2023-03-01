import React from "react";

const UserFind: React.FC = () => {
  const users = [
    {
      name: "Syket",
      age: 20,
      designation: "Software Engineer",
    },
    {
      name: "Sakib",
      age: 25,
      designation: "Programmer",
    },
    {
      name: "Jamy",
      age: 30,
      designation: "Designer",
    },
    {
      name: "Hanif",
      age: 20,
      designation: "UX Writer",
    },
  ];
  const [userList, setUserList] = React.useState<
    { name: string; age: number; designation: string }[] | undefined
  >(users);
  const [text, setText] = React.useState<string>("");

  const handleOnClick = () => {
    const findUsers =
      userList && userList?.length > 0
        ? userList?.filter((u) => u?.name === text)
        : undefined;

    console.log(findUsers);

    setUserList(findUsers);
  };

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
          <div className="absolute w-full mt-2 overflow-hidden bg-white rounded-md">
            <div className="px-3 py-2 cursor-pointer hover:bg-slate-100">
              <p className="text-sm font-medium text-gray-600">
                Button Ripple Effect
              </p>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing...
              </p>
            </div>
            <div className="px-3 py-2 cursor-pointer hover:bg-slate-100">
              <p className="text-sm font-medium text-gray-600">
                Custom Radio Buttons
              </p>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing...
              </p>
            </div>
            <div className="px-3 py-2 cursor-pointer hover:bg-slate-100">
              <p className="text-sm font-medium text-gray-600">
                Expand Images on Hover
              </p>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing...
              </p>
            </div>
            <div className="px-3 py-2 cursor-pointer hover:bg-slate-100">
              <p className="text-sm font-medium text-gray-600">Custom Checkbox</p>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFind;

import { useEffect, useState } from "react";

interface IFollowingListProps {
  following: string[];
  isVisible: boolean;
  onClose: Function;
}

const FollowingListForInvite = (props: IFollowingListProps) => {
  const [following, setFollowing] = useState(props.following);
  const [isInvited, setIsInvited] = useState(false);

  const handleOnClose = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "container") {
      setFollowing(props.following);
      props.onClose();
    }
  };

  useEffect(() => {
    setFollowing([]);
  }, [props.following]);

  if (!props.isVisible) {
    return null;
  }
  const handleInviteClick = async () => {
    if (isInvited) {
      setIsInvited(false);
    } else {
      setIsInvited(true);
    }
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="w-1/4 p-5 bg-white rounded max-h-[60vh] min-h-[60vh]">
        <h1 className="py-3 font-semibold text-center text-gray-900 border-b-4 border-solid border-b-lgrey">
          Search Invitation
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="py-2">
            <div className="flex justify-between bg-white rounded-md shadow shadow-black/20">
              <input
                type="text"
                className="flex-1 block w-full px-3 py-2 focus:outline-none"
                placeholder="Search Username"
                onChange={async (event) => {
                  // searching

                  if ((event.target.value as string) === "") {
                    setFollowing([]);
                  } else if ((event.target.value as string) !== "") {
                    let filteredUsers: Array<string> = Array<string>();

                    props.following.forEach((u) => {
                      if (u.startsWith(event.target.value as string)) {
                        filteredUsers.push(u);
                      }
                    });

                    setFollowing(filteredUsers);
                  }
                }}
              />
            </div>

            <div className="justify-center py-2 text-center">
              <div className="overflow-y-auto max-h-[45vh]">
                {following.length > 0 ? (
                  following.map((user) => {
                    return (
                      <div className="flex">
                        <div className="flex-1 inline-block text-left">
                          <div>
                            <a className="flex items-center p-2 text-base font-normal ">
                              <svg
                                className="flex-shrink-0 w-6 h-6"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              ></svg>
                              <span className="flex-1 inline-block text-left">
                                {user}
                                {isInvited ? (
                                  <button
                                    className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                                    onClick={() => handleInviteClick()}
                                  >
                                    Invite
                                  </button>
                                ) : (
                                  <button
                                    className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                                    onClick={() => handleInviteClick()}
                                  >
                                    Invited
                                  </button>
                                )}
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-3 py-2 cursor-pointer hover:bg-slate-100">
                    <p className="text-sm font-medium text-gray-600"></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FollowingListForInvite;

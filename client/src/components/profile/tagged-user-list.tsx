import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import fetchUser from "../../services/user/fetch-user";

interface ITaggedUserListProps {
  taggedUsers: string[];
  isVisible: boolean;
  onClose: Function;
}

const TaggedUserList = (props: ITaggedUserListProps) => {
  const [taggedUsers, setTaggedUsers] = useState(props.taggedUsers);

  let navigate = useNavigate();

  const handleOnClose = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "container") {
      setTaggedUsers(props.taggedUsers);
      props.onClose();
    }
  };

  useEffect(() => {
    setTaggedUsers(props.taggedUsers);
  }, [props.taggedUsers]);

  if (!props.isVisible) {
    return null;
  }

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="w-1/4 p-5 bg-white rounded max-h-[60vh] min-h-[30vh]">
        <h1 className="py-1 font-semibold text-center text-gray-900 border-b-4 border-solid border-b-lgrey">
          Tagged Users
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="py-2">
         

            <div className="justify-center py-2 text-center">
              <div className="overflow-y-auto max-h-[45vh]">
                {taggedUsers.map((user) => {
                  return (
                    <div className="flex" key={user}>
                      <button
                        className="flex-1 inline-block text-left"
                        onClick={() => {
                          navigate(`/user/${user}`);
                        }}
                      >
                        {user}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaggedUserList;

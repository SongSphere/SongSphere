import { TUser } from "../../types/user";
import { TPartyRoom } from "../../types/party-room";
import { useEffect, useState } from "react";
import TransferOwner from "../../services/party/trasnfer-owner";

interface IListernerListProps {
    listeners: string[];
    isVisible: boolean;
    onClose: Function;
    room: TPartyRoom;
}

const ListenerList = (props: IListernerListProps) => {
    const [followers, setFollowers] = useState(props.listeners);

    const handleOnClose = (e: React.ChangeEvent<any>) => {
      if (e.target.id === "container") {
        setFollowers(props.listeners);
        props.onClose();
      }
    };
  
    useEffect(() => {
      setFollowers(props.listeners);
    }, [props.listeners]);
  
    if (!props.isVisible) {
      return null;
    }
    return (
        
        <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-1/4 p-5 bg-white rounded max-h-[60vh] min-h-[60vh]">
          <h1 className="py-3 font-semibold text-center text-gray-900 border-b-4 border-solid border-b-lgrey">
            Room Listeners
          </h1>
  
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="py-2">
              <div className="flex justify-between bg-white rounded-md shadow shadow-black/20">
                
              </div>
  
              <div className="justify-center py-2 text-center">
                <div className="overflow-y-auto max-h-[45vh]">
                  {followers.map((user) => {
                    return (
                      <div className="flex" key={user}>
                        <button className="flex-1 inline-block text-left"
                        onClick={async() => 
                            await TransferOwner(props.room, user).then(() => {
                                window.location.reload();
                            })
                        }
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
export default ListenerList;
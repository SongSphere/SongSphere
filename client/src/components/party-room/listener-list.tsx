import { TUser } from "../../types/user";
import { TPartyRoom } from "../../types/party-room";
import { useEffect, useState } from "react";
import TransferOwner from "../../services/party/trasnfer-owner";
import DeleteMember from "../../services/party/delete-member";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import NotificationCard from "../notification/comment-notification-card";
import sendNotification from "../../services/notification/send-notification";
import Session from "../../session";
import { TNotification } from "../../types/notification";
import BlockMember from "../../services/party/block-member";

interface IListernerListProps {
    listeners: string[];
    isVisible: boolean;
    onClose: Function;
    room: TPartyRoom;
}

const ListenerList = (props: IListernerListProps) => {
    const [followers, setFollowers] = useState(props.listeners);
    const [user, setUser] = useState<TUser | null>(null);

    useEffect(() => {
        setUser(Session.getUser());
      }, [user]);

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
    if(!user) {
        return null;
    }
   
    return (
        
        <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className=" p-5 bg-white rounded max-h-[60vh] min-h-[60vh]">
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
              <input
                type="text"
                className="flex-1 block w-full px-3 py-2 focus:outline-none"
                placeholder="search listeners"
                onChange={async (event) => {
                  // searching
                  let filteredUsers: Array<string> = Array<string>();

                  props.listeners.forEach((u) => {
                    if (u.startsWith(event.target.value as string)) {
                      filteredUsers.push(u);
                    }
                  });

                  setFollowers(filteredUsers);
                }}
              />
              </div>
  
              <div className="justify-center py-2 text-center">
                <div className="overflow-y-auto max-h-[45vh]">
                  {followers.map((users) => {
                    return (
                      <div className="grid grid-flow-col" key={users}>
                        <h1 className="float-left">{users}</h1>
                        {user.username === props.room.ownerUsername ? (
                            <div>
                                <button className="float-right text-lblue"
                                onClick={async() => 
                                    await TransferOwner(props.room, users).then(() => {
                                        
                                        window.location.reload();
                                    })
                                }
                                >
                                transfer
                                </button>
                                <button className=" text-lblue"
                                onClick={() => DeleteMember(props.room, users)
                                  .then(()=>fetchUserByUsername(users))
                                  .then((removed) =>{removed.partyRoom=""; 
                                  if(props.room._id) {
                                    BlockMember(props.room, users);
                                  }
                                })
                                }
                                >
                                remove
                            </button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        
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
import { TUser } from "../../types/user";
import { TPartyRoom } from "../../types/party-room";
import { useEffect, useState } from "react";
import TransferOwner from "../../services/party/trasnfer-owner";
import Session from "../../session";
import DeleteMember from "../../services/party/delete-member";
interface IListernerListProps {
    listeners: string[];
    room: TPartyRoom;
}

const MemberList = (props: IListernerListProps) => {
    const [followers, setFollowers] = useState(props.listeners);
    const [user, setUser] = useState<TUser | null>(null);
    useEffect(() => {
      setUser(Session.getUser());
    }, [user]);
    return (
        
        <div
        id="container"
        
        className="inset-0 flex items-center justify-center "
      >
        <div className="p-5 mt-5 bg-white rounded h-1/2">
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
                  {followers.map((users) => {
                    return (
                      <div className="flex border-2 border-solid border-navy border-b-1" key={users}>
                       {users}
                       {user?.username === props.room.ownerUsername ?(<button className="pl-10 text-lblue"
                       onClick={() => DeleteMember(props.room, users)}
                       >
                        remove
                       </button>): (<div></div>)}
                       
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
export default MemberList;
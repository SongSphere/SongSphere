import { TUser } from "../types/user";
import React, { useState } from "react";
import { useEffect } from "react";
import Session from "../session";
import { TPartyRoom } from "../types/party-room";
import CreateRoom from "../services/party/createRoom";
import { useNavigate } from "react-router-dom";
import fetchRoomByOwner from "../services/party/fetch-room-by-owner";
import fetchRoomById from "../services/party/fetch-room-by-id";
import AddMember from "../services/party/add-member";
import Navbar from "../components/navbar";
import SearchUserDropDown from "../components/seach-user-dropdown";
import SearchForInvite from "../components/invitations/search-user-for-invite";
import FollowingList from "../components/profile/following-list";
import FollowingListForInvite from "../components/invitations/search-user-for-invite";
import addMember from "../services/party/add-member";

const EnterPartyPage = () => {
  let navigate = useNavigate();

  let room;
  const [user, setUser] = useState<TUser | null>(null);
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [idForinvite, setIdForInvite] = useState<string>("");
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [partyRoom, setPartyRoom] = useState<TPartyRoom | null>(null);

  const handleFollowingClose = () => {
    setShowFollowingModal(false);
  };
  const handleFollowingOpen = () => {
    setShowFollowingModal(true);
  };

  useEffect(() => {
    setUser(Session.getUser());
  }, [Session.getUser()]);
  if (!user) {
    return <div>fetching user</div>;
  }
  

  return (
    <div>
      <Navbar />
      <div className="w-full h-full min-h-screen bg-lblue">
        <div className="grid grid-cols-2">
          <div className="w-11/12 p-3 m-5 bg-white rounded-xl">
            <h1 className="text-3xl text-center text-navy">
              Create A Party Room
            </h1>
            <div className="flex">
              <h1 className="text-xl text-navy">Name:</h1>
              <form className="mt-1 ml-2">
                <label>
                  <input
                    className="e-input"
                    type="text"
                    value={name}
                    placeholder={"Enter Party Room Name"}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </label>
              </form>
            </div>
            <div className="flex">
              <h1 className="text-xl text-navy">Description:</h1>
              <form className="mt-1 ml-2">
                <label>
                  <input
                    className="e-input"
                    type="text"
                    value={description}
                    placeholder={"Enter Description"}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </label>
              </form>
            </div>
            <button
              className="p-3 text-white rounded-xl bg-navy"
              onClick={async () => {
                if (user) {
                  const newRoom: TPartyRoom = {
                    ownerUsername: user.username,
                    ownerEmail: user.email,
                    partyName: name,
                    description: description,
                    members: [],
                    invitedMembers: [],
                  };
                  await CreateRoom(newRoom)
                    .then((res) => {
                      if (!res) {
                      } else {
                        fetchRoomByOwner(newRoom.ownerUsername).then((room) => {
                          navigate(`/party/${room._id}`);
                          window.location.reload();
                        });
                      }
                    })
                    .catch((error) => {});
                }
              }}
            >
              Create
            </button>
          </div>
          <div className="w-11/12 p-3 m-5 bg-white rounded-xl">
            <h1 className="text-3xl text-center text-navy">
              Enter An Existing Party Room
            </h1>
            <div className="flex">
              <h1 className="text-xl text-navy">Room Id:</h1>
              <form className="mt-1 ml-2">
                <label>
                  <input
                    className="e-input"
                    type="text"
                    value={id}
                    placeholder={"Enter Party Room Id"}
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  />
                </label>
              </form>
            </div>
            <button
              className="p-3 text-white rounded-xl bg-navy"
              onClick={() => {
                fetchRoomById(id).then((res) => {
                  if (res) {
                    navigate(`/party/${res._id}`);
                    window.location.reload();
                    if (res._id) {
                      // Add member through join button
                      addMember(res._id, user.username);
                    }
                  } else {
                    alert("Room does not exist");
                  }
                });
              }}
            >
              Enter
            </button>
          </div>

          <div className="w-11/12 p-3 m-5 bg-white rounded-xl">
            <h1 className="text-3xl text-center text-navy">
              Invite A Friend To Your Party
            </h1>
            <div className="flex">
              <h1 className="text-xl text-navy">Invitation</h1>
            </div>
            <div></div>
            <div className="flex">
              <h1 className="text-xl text-navy">Room Id:</h1>
              <form className="mt-1 ml-2">
                <label>
                  <input
                    className="e-input"
                    type="text"
                    value={idForinvite}
                    placeholder={"Enter Party Room Id For Invite"}
                    onChange={(e) => {
                      setIdForInvite(e.target.value);
                    }}
                  />
                </label>
              </form>
            </div>
            <div></div>
           
            <FollowingListForInvite
              following={user.following}
              isVisible={showFollowingModal}
              onClose={handleFollowingClose}
              roomId={idForinvite}
              room={partyRoom}
            />

            <button
              className="p-3 text-white rounded-xl bg-navy"
              onClick={() => {
                if (idForinvite !== "") {
                  fetchRoomById(idForinvite).then((res) => {
                    if (res) {
                      if (res.ownerUsername === user.username) {
                        handleFollowingOpen();
                        setPartyRoom(res);
                      } else {
                        console.log("You are not the owner of this party");
                      }
                    } else {
                      alert("Room does not exist");
                    }
                  });
                }  
                
              }}
            >
              Find User To Invite
            </button>

            {/* <button
              className="p-3 text-white rounded-xl bg-navy"
              onClick={() => {
                fetchRoomById(id).then((res) => {
                  if (res) {
                    navigate(`/party/${res._id}`);
                    window.location.reload();
                  } else {
                  }
                });
              }}
            >
              Send
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EnterPartyPage;

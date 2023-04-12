import { useNavigate, useParams } from "react-router-dom";
import { TUser } from "../types/user";
import Navbar from "../components/navbar";
import { TPartyRoom } from "../types/party-room";
import { useEffect, useState } from "react";
import fetchRoomById from "../services/party/fetch-room-by-id";
import Session from "../session";
import DeleteRoom from "../services/party/delete-room";
import DeleteMember from "../services/party/delete-member";
import TransferOwner from "../services/party/trasnfer-owner";
import { TMusicContent } from "../types/music-content";
import AppleMusicPlayerCard from "../components/player/apple-music-player-card";
import SpotifyPlayerCard from "../components/player/spotify-music-player-card";
import PartyRoomQueue from "../components/party-room/queue";
import ListenerList from "../components/party-room/listener-list";
import AddMember from "../services/party/add-member";
import MemberList from "../components/party-room/members-list";
import FollowingListForInvite from "../components/invitations/search-user-for-invite";


const PartyPage = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [room, setRoom] = useState<TPartyRoom | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [showListenersModal, setShowListenersModal] = useState(false);
  const [added, setAdded] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [partyRoom, setPartyRoom] = useState<TPartyRoom | null>(null);

  const handleFollowingClose = () => {
    setShowFollowingModal(false);
  };
  const handleFollowingOpen = () => {
    setShowFollowingModal(true);
  };


  const handleOpenListen = () => {
    setShowListenersModal(true);
  }
  const handleCloseListen = () => {
    setShowListenersModal(false);
  }

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
  }, [user]);

  useEffect(() => {
    if (id) {
      fetchRoomById(id).then((res) => {
        setRoom(res);
      });
    }
  }, []);
  useEffect (() => {
    if(user && room?._id) {
      if(!room.members.includes(user.username)) {
        AddMember(room._id.toString(), user.username);
      }
     
      
    }
  })
  useEffect (() => {
    if (user && id) {
      user.partyRoom = id;
    }
  })

  if (!user) {
    return <div>fetching user</div>;
  }

  if (!room) {
    return <div>Invalid Room Id</div>;
  }
  return (
    <div className="w-full h-full min-h-screen bg-lblue">
      <Navbar />
      <div className="grid grid-cols-4 gap-2 md:grid-flow-col">
        <div className="relative flex justify-center col-span-1">
          <div className="fixed flex h-[95%] mt-8">
            <div className="bg-white rounded-lg w-80 h-5/6 drop-shadow-md">
              <div>
                <h1 className="text-3xl text-center text-navy">
                  Name:{room?.partyName}
                </h1>
                <h1 className="text-3xl text-center text-navy">
                  Description: {room?.description}
                </h1>
                <h1 className="text-3xl text-center text-navy">
                  Owner: {room?.ownerUsername}
                </h1>
                <button
                  className="absolute p-3 text-white bg-navy rounded-xl top-13 right-5"
                  onClick={async () => {
                    if (user.username === room.ownerUsername) {
                      await DeleteRoom(room).then(() => {
                        user.partyRoom = "";
                        navigate(`/`);
                        window.location.reload();
                      });
                    } else {
                      await DeleteMember(room, user.username).then(() => {
                        user.partyRoom = "";
                        navigate(`/`);
                        window.location.reload();
                      });
                    }
                  }}
                >
                  Exit
                </button>
                {user.username === room.ownerUsername ? (
                  <button
                    className="absolute p-3 text-white bg-navy rounded-xl top-13 right-20"
                    onClick={() => handleOpenListen()}
                  >
                    Transfer
                  </button>

                  

                  

                ) : (
                  <div></div>
                )}

            <FollowingListForInvite
              following={user.following}
              isVisible={showFollowingModal}
              onClose={handleFollowingClose}
              roomId={id}
              room={partyRoom}
            />

            <button
              className="p-3 text-white rounded-xl bg-navy"
              onClick={() => {
                if (room && id) {
                  fetchRoomById(id).then((res) => {
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
              <MemberList listeners={room.members} room={room}/>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <PartyRoomQueue />
        </div>
        {service === "apple" ? (
          <AppleMusicPlayerCard selectedSong={song} />
        ) : (
          <SpotifyPlayerCard selectedSong={song} />
        )}
        <ListenerList 
          listeners={room.members}
          isVisible={showListenersModal}
          onClose={handleCloseListen}
          room={room}
        />
      </div>
    </div>
  );
};

export default PartyPage;

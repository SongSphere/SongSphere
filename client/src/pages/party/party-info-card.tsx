import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchUserForInvite from "../../components/invitations/search-user-for-invite";
import ListenerList from "../../components/party-room/listener-list";
import FailPopUp from "../../components/popup/fail-popup";
import SearchSongPartyRoom from "../../components/post/search-song-party-room";
import DeleteMember from "../../services/party/delete-member";
import DeleteRoom from "../../services/party/delete-room";
import fetchRoomById from "../../services/party/fetch-room-by-id";
import { TMusicContent } from "../../types/music-content";
import { TPartyRoom } from "../../types/party-room";
import { TUser } from "../../types/user";

interface IPartyInfoCardProps {
  room: TPartyRoom;
  user: TUser;
  song: TMusicContent | null;
  id: string;
}

const PartyInfoCard = (props: IPartyInfoCardProps) => {
  let navigate = useNavigate();
  const [removeMemberFailOpen, setRemoveMemberFailOpen] = useState(false);
  const [showListenersModal, setShowListenersModal] = useState(false);
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
  };
  const handleCloseListen = () => {
    setShowListenersModal(false);
  };

  const ERROR_MSG = "Oh no! An error occurs when deleting a member";

  return (
    <div className="relative flex justify-center col-span-1 px-2">
      <div className="absolute flex h-[95%] mt-8 w-[90%]">
        <div className="w-full bg-white rounded-lg h-5/6 drop-shadow-md">
          <div className="">
            <h1 className="text-3xl text-center text-navy">
              Name:{props.room.partyName}
            </h1>
            <h1 className="text-3xl text-center text-navy">
              Description: {props.room.description}
            </h1>
            <h1 className="text-3xl text-center text-navy">
              Owner: {props.room.ownerUsername}
            </h1>
            <button
              className="p-3 ml-3 text-white bg-navy rounded-xl top-13"
              onClick={async () => {
                if (props.user.username === props.room.ownerUsername) {
                  await DeleteRoom(props.room).then(() => {
                    navigate("/");
                    // window.location.reload();
                  });
                } else {
                  await DeleteMember(props.room, props.user.username).then(
                    (res) => {
                      if (res) {
                        navigate(`/`);
                        window.location.reload();
                      } else {
                        <FailPopUp
                          open={removeMemberFailOpen}
                          setOpen={setRemoveMemberFailOpen}
                          failText={ERROR_MSG}
                        />;
                      }
                    }
                  );
                }
              }}
            >
              Exit
            </button>

            <button
              className="p-3 ml-3 text-white bg-navy rounded-xl top-13 "
              onClick={() => handleOpenListen()}
            >
              View Listeners
            </button>

            <ListenerList
              listeners={props.room.members}
              isVisible={showListenersModal}
              onClose={handleCloseListen}
              room={props.room}
            />
            <SearchUserForInvite
              following={props.user.following}
              isVisible={showFollowingModal}
              onClose={handleFollowingClose}
              roomId={props.id}
              room={props.room}
            />

            <button
              className="p-3 ml-3 text-white rounded-xl bg-navy"
              onClick={() => {
                if (props.room && props.id) {
                  fetchRoomById(props.id).then((res) => {
                    if (res) {
                      if (res.ownerUsername === props.user.username) {
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
          </div>

          <div className="w-full h-96">
            {props.song ? (
              <SearchSongPartyRoom song={props.song.name} />
            ) : (
              <SearchSongPartyRoom />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyInfoCard;

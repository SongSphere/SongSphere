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
    <div className="w-full h-full p-4">
      <div className="pb-10 bg-white rounded-lg h-128">
        <h3 className="pt-10 text-3xl font-semibold text-center">
          Profile Settings
        </h3>
        <div className="p-4">
          <h1 className="text-navy">
            <span className="font-semibold">Name: </span>
            {props.room.partyName}
          </h1>
          <h1 className="text-navy">
            <span className="font-semibold">Description: </span>
            {props.room.description}
          </h1>
          <h1 className="text-navy">
            <span className="font-semibold">Owner: </span>
            {props.room.ownerUsername}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              className="px-2 py-1 rounded-lg bg-sky-300 hover:bg-sky-400 drop-shadow-lg"
              onClick={() => handleOpenListen()}
            >
              View Listeners
            </button>
            {props.room.ownerUsername === props.user.username && (
              <button
                className="px-2 py-1 rounded-lg bg-sky-300 hover:bg-sky-400 drop-shadow-lg"
                onClick={() => {
                  if (props.room && props.id) {
                    fetchRoomById(props.id).then((res) => {
                      if (res) {
                        handleFollowingOpen();
                        setPartyRoom(res);
                      } else {
                        alert("Room does not exist");
                      }
                    });
                  }
                }}
              >
                Find User To Invite
              </button>
            )}
            <button
              className="px-2 py-1 rounded-lg bg-sky-300 hover:bg-sky-400 drop-shadow-lg"
              onClick={async () => {
                if (props.user.username === props.room.ownerUsername) {
                  await DeleteRoom(props.room).then(() => {
                    navigate("/");
                  });
                } else {
                  await DeleteMember(props.room, props.user.username).then(
                    (res) => {
                      if (res) {
                        navigate(`/`);
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
          </div>
        </div>
        {props.song ? (
          <SearchSongPartyRoom song={props.song.name} />
        ) : (
          <SearchSongPartyRoom />
        )}
      </div>
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
    </div>
  );
};

export default PartyInfoCard;

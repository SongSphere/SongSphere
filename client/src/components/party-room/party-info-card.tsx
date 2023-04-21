import { useRef, useState } from "react";
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
import SearchSongPlayList from "./search-song-playlist";
import { useEffect } from "react";
import fetchListeners from "../../services/party/fetch-listeners";

interface IPartyInfoCardProps {
  room: TPartyRoom;
  user: TUser;
  currentlyPlayingSong: TMusicContent | null;
  id: string;
}

const PartyInfoCard = (props: IPartyInfoCardProps) => {
  let navigate = useNavigate();
  const [removeMemberFailOpen, setRemoveMemberFailOpen] = useState(false);
  const [exitRoomFailOpen, setExitRoomFailOpen] = useState(false);
  const [showListenersModal, setShowListenersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [partyRoom, setPartyRoom] = useState<TPartyRoom>(props.room);
  const [listeners, setListeners] = useState<string[]>(props.room.members);
  const [following, setFollowing] = useState<string[]>(props.user.following);
  const [owner, setOwner] = useState<string>(props.room.ownerUsername);
  const ownerRef = useRef<string>(props.room.ownerUsername);
  const lesRef = useRef<string[] | null>(null);

  const handlePlaylistClose = () => {
    setShowPlaylistModal(false);
  };

  const handleFollowingOpen = () => {
    setShowFollowingModal(true);
  };

  const handleFollowingClose = () => {
    setShowFollowingModal(false);
  };

  const handleExitPartyOpen = () => {
    setExitRoomFailOpen(true);
  };

  const handleExitPartyClose = () => {
    setExitRoomFailOpen(false);
  
  };

  const handleOpenListen = () => {
    setShowListenersModal(true);
  };
  const handleCloseListen = () => {
    setShowListenersModal(false);
  };
  const handleOpenTransfer = () => {
    setShowTransfer(true);
  };

  useEffect(() => {
    let mounted = true;
    const updateListen = async () => {
      let newListen;
      if (props.room._id) {
        newListen = await fetchListeners(props.room._id.toString());
      }
      if (
        newListen &&
        JSON.stringify(newListen) !== JSON.stringify(lesRef.current) &&
        mounted
      ) {
        lesRef.current = newListen;
        setListeners(newListen);
      }
    };
    const interval = setInterval(updateListen, 500);
    return () => {
      clearInterval(interval);
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const updateOwner = async () => {
      let newOwner;
      let newRoom;
      if (props.room._id) {
        newRoom = await fetchRoomById(props.room._id.toString());
        newOwner = newRoom.ownerUsername;
      }
      if (
        newRoom &&
        newOwner &&
        JSON.stringify(newOwner) !== JSON.stringify(ownerRef.current) &&
        mounted
      ) {
        ownerRef.current = newOwner;
        setOwner(newOwner);
        setPartyRoom(newRoom);
        if (newOwner === props.user.username) {
          setShowTransfer(true);
        }
      }
    };
    const interval = setInterval(updateOwner, 500);
    return () => {
      clearInterval(interval);
      mounted = false;
    };
  }, []);

  const ERROR_MSG = "Oh no! An error occurs when deleting a member";
  const ERROR_MSG_EXIT_PARTY = "Oh no! An error occurs when exiting the party";

  return (
    <div className="w-full h-full p-4">
      <div className="p-4 pb-10 bg-white rounded-lg h-[calc(90vh-8rem)]">
        <h3 className="pt-10 text-3xl font-semibold text-center">
          Party Room Settings
        </h3>
        <div className="">
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
            {owner}
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
                    handleFollowingOpen();
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
                  props.user.partyRoom = "";
                  await DeleteRoom(props.room)
                    .then(() => {
                      navigate("/");
                    })
                    .catch((err) => {
                      handleExitPartyOpen();
                      console.log("Backend seems not running");
                      console.log(err);
                    });
                } else {
                  await DeleteMember(props.room, props.user.username).then(
                    (res) => {
                      props.user.partyRoom = "";
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
        {props.currentlyPlayingSong ? (
          <SearchSongPartyRoom song={props.currentlyPlayingSong.name} />
        ) : (
          <SearchSongPartyRoom />
        )}
        <button
          className="px-2 py-1 rounded-lg bg-sky-300 hover:bg-sky-400 drop-shadow-lg"
          onClick={() => {
            setShowPlaylistModal(true);
          }}
        >
          Add from library
        </button>
      </div>
      <SearchSongPlayList
        user={props.user}
        isVisible={showPlaylistModal}
        onClose={handlePlaylistClose}
      />
      <ListenerList
        listeners={listeners}
        isVisible={showListenersModal}
        onClose={handleCloseListen}
        room={partyRoom}
      />
      <SearchUserForInvite
        // following={props.user.following}
        isVisible={showFollowingModal}
        onClose={handleFollowingClose}
        roomId={props.id}
        room={props.room}
      />
      <FailPopUp
        open={showTransfer}
        setOpen={setShowTransfer}
        failText="You are now the owner of this party!"
      />
      
      <FailPopUp
        open={exitRoomFailOpen}
        setOpen={handleExitPartyClose}
        failText={ERROR_MSG_EXIT_PARTY}
      />
      ;
    </div>
  );
};

export default PartyInfoCard;

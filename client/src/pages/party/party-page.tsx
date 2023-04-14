import { useNavigate, useParams, Link } from "react-router-dom";
import { TUser } from "../../types/user";
import Navbar from "../../components/navbar";
import { TPartyRoom } from "../../types/party-room";
import { useEffect, useState } from "react";
import fetchRoomById from "../../services/party/fetch-room-by-id";
import Session from "../../session";
import DeleteRoom from "../../services/party/delete-room";
import DeleteMember from "../../services/party/delete-member";
import TransferOwner from "../../services/party/trasnfer-owner";
import { TMusicContent } from "../../types/music-content";
import AppleMusicPlayerCard from "../../components/player/apple-music-player-card";
import SpotifyPlayerCard from "../../components/player/spotify-music-player-card";
import PartyRoomQueue from "../../components/party-room/queue";
import Search from "../../components/post/search-song";
import SearchSongPartyRoom from "../../components/post/search-song-party-room";
import SearchSong from "../../components/post/search-song";
import ListenerList from "../../components/party-room/listener-list";
import AddMember from "../../services/party/add-member";
import SearchUserForInvite from "../../components/invitations/search-user-for-invite";

import AppleMusicPartyRoomPlayerCard from "../../components/party-room/apple-music-party-player";
import SpotifyPartyRoomPlayerCard from "../../components/party-room/spotify-music-party-player";
import PartyRoomChat from "../../components/party-room/party-chat";
import RemoveInvitation from "../../services/party/remove-invitation";

const songsList = [
  {
    albumName: "Clutter, Vol. 1",
    artist: "a balladeer",
    category: "song",
    cover: "https://i.scdn.co/image/ab67616d0000b2735dcb1476842b5d6e92cfc7f0",
    id: "3kep7ZWLCMAsSDhEOI6eeu",
    name: "As Far As The Compliments Went",
    service: "spotify",
  },
  {
    albumName: "From A To Beginning",
    artist: "Gregor McEwan",
    category: "song",
    cover: "https://i.scdn.co/image/ab67616d0000b273e6644fc549c9a75e2be428cf",
    id: "6RnZWkTSsTE0Npaj0reK4k",
    name: "(Hope You Stay) Here For Tonight",
    service: "spotify",
  },
  {
    albumName: "Abbey Road (Remastered)",
    artist: "The Beatles",
    category: "song",
    cover: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
    id: "6UCFZ9ZOFRxK8oak7MdPZu",
    name: "Her Majesty - Remastered 2009",
    service: "spotify",
  },
];

const PartyPage = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [room, setRoom] = useState<TPartyRoom | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [currentlyPlayingSong, setCurrentlyPlayingSong] =
    useState<TMusicContent | null>(null);
  const [showListenersModal, setShowListenersModal] = useState(false);
  const [added, setAdded] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [partyRoom, setPartyRoom] = useState<TPartyRoom | null>(null);
  const [queueIndex, setQueueIndex] = useState(0);
  const [song, setSong] = useState<TMusicContent | null>(null);

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

  const incrementQueueIndex = () => {
    setQueueIndex(queueIndex + 1);
  };

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

    setQueueIndex(0);
    setCurrentlyPlayingSong(songsList[queueIndex]);
  }, []);

  // useEffect(() => {
  //   if (user && room?._id) {
  //     if (!room.members.includes(user.username)) {
  // AddMember(room._id.toString(), user.username);
  // console.log(`${user.username} added to room}`);
  //     }
  //   }
  // });
  useEffect(() => {
    if (user && id) {
      user.partyRoom = id;
    }
  });

  useEffect(() => {
    console.log("index changed");
    setCurrentlyPlayingSong(songsList[queueIndex]);
  }, [queueIndex]);

  if (!user) {
    return <div>fetching user</div>;
  }

  if (!room) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="font-extrabold tracking-widest text-white text-9xl">
          404
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span
              onClick={() => {
                navigate(`/`);
                user.partyRoom = "";
              }}
              className="relative block px-8 py-3 bg-[#1A2238] border border-current"
            >
              Go Home
            </span>
          </a>
        </button>
      </div>

      // <div>
      //   <div>Invalid Room Id</div>
      // <button
      //   onClick={() => {
      //     navigate(`/`);
      //     user.partyRoom = "";
      //   }}
      // >
      //   Go Back
      // </button>
      // </div>
    );
  }
  return (
    <div className="w-full h-full min-h-screen bg-lblue">
      <Navbar />
      {/* <div className="w-screen  max-w-[100%] h-screen bg-lblue">
        {song ? (
          <SearchSongPartyRoom song={song.name} />
        ) : (
          <SearchSongPartyRoom />
        )}
      </div> */}
      <div className="grid grid-cols-4 gap-2 md:grid-flow-col">
        <div className="relative flex justify-center col-span-1 px-2">
          <div className="absolute flex h-[95%] mt-8 w-[90%]">
            <div className="w-full bg-white rounded-lg h-5/6 drop-shadow-md">
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
                  className="p-3 text-white bg-navy rounded-xl top-13 right-5"
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
                    className="p-3 text-white bg-navy rounded-xl top-13 right-20"
                    onClick={() => handleOpenListen()}
                  >
                    Transfer
                  </button>
                ) : (
                  <div></div>
                )}

                <SearchUserForInvite
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
                <MemberList listeners={room.members} room={room} />
              </div>

              {/* <div className="w-screen max-w-[200%] max-h-[80%] h-screen"> */}
              <div className="w-full h-96">
                {song ? (
                  <SearchSongPartyRoom song={song.name} />
                ) : (
                  <SearchSongPartyRoom />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          {songsList.length > 0 ? (
            <PartyRoomQueue
              songsList={songsList}
              setCurrentlyPlayingSong={setCurrentlyPlayingSong}
            />
          ) : (
            <div className="justify-center p-20 mt-20 text-center border-t-8 border-solid h-inherit w-inherit">
              <h1 className="text-xl text-white">
                No songs currently in the Queue.
              </h1>
            </div>
          )}
        </div>
        <div className="relative flex-col justify-center ">
          {service === "apple" ? (
            <AppleMusicPartyRoomPlayerCard
              selectedSong={currentlyPlayingSong}
            />
          ) : (
            <SpotifyPartyRoomPlayerCard selectedSong={currentlyPlayingSong} />
          )}
          <PartyRoomChat />
        </div>
      </div>
    </div>
  );
};

export default PartyPage;

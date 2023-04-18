import { useNavigate, useParams, Link } from "react-router-dom";
import { TUser } from "../../types/user";
import Navbar from "../../components/navbar";
import { TPartyRoom } from "../../types/party-room";
import { useEffect, useRef, useState } from "react";
import fetchRoomById from "../../services/party/fetch-room-by-id";
import Session from "../../session";
import DeleteRoom from "../../services/party/delete-room";
import DeleteMember from "../../services/party/delete-member";
import TransferOwner from "../../services/party/trasnfer-owner";
import { TMusicContent } from "../../types/music-content";
import PartyRoomQueue from "../../components/party-room/party-queue";
import Search from "../../components/post/search-song";
import SearchSongPartyRoom from "../../components/post/search-song-party-room";
import SearchSong from "../../components/post/search-song";
import ListenerList from "../../components/party-room/listener-list";
import AddMember from "../../services/party/add-member";
import FailPopUp from "../../components/popup/fail-popup";

import SearchUserForInvite from "../../components/invitations/search-user-for-invite";

import AppleMusicPartyRoomPlayerCard from "../../components/party-room/apple-music-party-player";
import PartyRoomChat from "../../components/party-room/party-chat";
import RemoveInvitation from "../../services/party/remove-invitation";
import fetchQueue from "../../services/party/fetch-queue";
import SpotifyPartyRoomPlayerV2 from "../../components/party-room/spotify-party-player-v2";
import PartyRoomLayout from "../../layouts/party-room-layout";
import PartyInfoCard from "../../components/party-room/party-info-card";

const PartyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  let navigate = useNavigate();

  const [room, setRoom] = useState<TPartyRoom | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [currentlyPlayingSong, setCurrentlyPlayingSong] =
    useState<TMusicContent | null>(null);
  const [upNext, setUpNext] = useState<TMusicContent[] | null>(null);
  const upNextRef = useRef<TMusicContent[] | null>(null);
  const queueRef = useRef<TMusicContent[] | null>(null);
  const [queueIndex, setQueueIndex] = useState(0);
  const [songPlaying, setSongPlaying] = useState<TMusicContent | null>(null);
  const [isSongOver, setIsSongOver] = useState<boolean>(false);

  useEffect(() => {
    const playNextSong = () => {
      if (isSongOver) {
        if (upNextRef.current && queueRef.current) {
          console.log("next song. index: ", queueIndex);
          console.log("upnext", upNextRef.current);
          console.log("current", queueRef.current);

          setIsSongOver(false);

          upNextRef.current = queueRef.current.slice(queueIndex + 1);
          console.log("setting current song 1", upNextRef.current);
          setSongPlaying(upNextRef.current[0]);

          setUpNext(upNextRef.current.slice(1));
          setQueueIndex(queueIndex + 1);
        }
      }
    };

    if (isSongOver) {
      playNextSong();
    }
  }, [isSongOver]);

  useEffect(() => {
    // Fetch user and set service
    const fetchUserData = async () => {
      if (id) {
        fetchRoomById(id).then((res) => {
          if (res == null) {
            console.log("It is null");
            navigate("/404");
          }

          setRoom(res);
        });
      }
      const fetchedUser = Session.getUser();
      const fetchedService = Session.getMusicService();
      setUser(fetchedUser);
      setService(fetchedService);
      setIsLoading(false);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    let mounted = true;

    const updateQueue = async () => {
      let newQueue;

      if (id) {
        newQueue = await fetchQueue(id);
      }

      if (
        newQueue &&
        JSON.stringify(newQueue) !== JSON.stringify(queueRef.current) &&
        mounted
      ) {
        queueRef.current = newQueue;
        // Only update the songPlaying state if the queue was empty before
        if (!songPlaying) {
          console.log("setting current song 2", newQueue);
          setSongPlaying(newQueue[0]);
        }
        upNextRef.current = newQueue.slice(queueIndex + 1);
        setUpNext(newQueue.slice(queueIndex + 1));
      }
    };

    const interval = setInterval(updateQueue, 500);

    return () => {
      clearInterval(interval);
      mounted = false;
    };
  }, [id, songPlaying]);

  useEffect(() => {
    if (user && room?._id) {
      if (!room.members.includes(user.username)) {
        AddMember(room._id, user.username);
      }
    }

    if (user && id) {
      user.partyRoom = id;
    }
  });

  if (isLoading || !user || !queueRef.current || !room || !id) {
    return <div>Loading...</div>;
  }

  const player = (
    <div className="w-full h-full bg-slate-900">
      {service === "apple" ? (
        <AppleMusicPartyRoomPlayerCard selectedSong={currentlyPlayingSong} />
      ) : (
        <SpotifyPartyRoomPlayerV2
          isSongOver={isSongOver}
          setIsSongOver={setIsSongOver}
          selectedSong={songPlaying}
        />
      )}
    </div>
  );

  return (
    <PartyRoomLayout
      // left={<PartyInfoCard user={user} room={room} song={song} id={id} />}
      left={
        <PartyInfoCard
          user={user}
          currentlyPlayingSong={currentlyPlayingSong}
          room={room}
          id={id}
        />
      }
      middle={
        <PartyRoomQueue
          queueIndex={queueIndex}
          currentlyPlayingSong={songPlaying}
          upNextSongs={upNext}
        />
      }
      right={player}
    />
  );

  // return (
  //   <div className="w-full h-full min-h-screen bg-lblue">
  //     <Navbar />
  //     <div className="grid grid-cols-4 gap-2 md:grid-flow-col">
  //       <div className="relative flex justify-center col-span-1 px-2">
  //         <div className="flex h-[100%] mt-8 w-[90%]">
  //           <div className="w-full h-full bg-white rounded-lg drop-shadow-md">
  //             <div className="">
  //               <h1 className="text-3xl text-center text-navy">
  //                 Name:{room?.partyName}
  //               </h1>
  //               <h1 className="text-3xl text-center text-navy">
  //                 Description: {room?.description}
  //               </h1>
  //               <h1 className="text-3xl text-center text-navy">
  //                 Owner: {room?.ownerUsername}
  //               </h1>
  //               <button
  //                 className="p-3 ml-3 text-white bg-navy rounded-xl top-13"
  //                 onClick={async () => {
  //                   if (user.username === room.ownerUsername) {
  //                     await DeleteRoom(room).then(() => {
  //                       navigate("/");
  //                     });
  //                   } else {
  //                     await DeleteMember(room, user.username).then((res) => {
  //                       if (res) {
  //                         navigate("/");
  //                       } else {
  //                         <FailPopUp
  //                           open={partyFailOpen}
  //                           setOpen={setPartyFailOpen}
  //                           failText={ERROR_MSG}
  //                         />;
  //                       }
  //                     });
  //                   }
  //                 }}
  //               >
  //                 Exit
  //               </button>

  //               <button
  //                 className="p-3 ml-3 text-white bg-navy rounded-xl top-13 "
  //                 onClick={() => handleOpenListen()}
  //               >
  //                 View Listeners
  //               </button>

  //               <ListenerList
  //                 listeners={room.members}
  //                 isVisible={showListenersModal}
  //                 onClose={handleCloseListen}
  //                 room={room}
  //               />
  //               <SearchUserForInvite
  //                 following={user.following}
  //                 isVisible={showFollowingModal}
  //                 onClose={handleFollowingClose}
  //                 roomId={id}
  //                 room={partyRoom}
  //               />

  //               <button
  //                 className="p-3 ml-3 text-white rounded-xl bg-navy"
  //                 onClick={() => {
  //                   if (room && id) {
  //                     fetchRoomById(id).then((res) => {
  //                       if (res) {
  //                         if (res.ownerUsername === user.username) {
  //                           handleFollowingOpen();
  //                           setPartyRoom(res);
  //                         } else {
  //                         }
  //                       } else {
  //                         alert("Room does not exist");
  //                       }
  //                     });
  //                   }
  //                 }}
  //               >
  //                 Find User To Invite
  //               </button>
  //             </div>

  //             {/* <div className="w-screen max-w-[200%] max-h-[80%] h-screen"> */}

  //             {currentlyPlayingSong ? (
  //               <SearchSongPartyRoom song={currentlyPlayingSong.name} />
  //             ) : (
  //               <SearchSongPartyRoom />
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //       <div className="col-span-2">
  //         <PartyRoomQueue
  //           queueIndex={queueIndex}
  //           currentlyPlayingSong={songPlaying}
  //           upNextSongs={upNext}
  //         />
  //       </div>
  //       <div className="relative flex-col justify-center ">
  //         {service === "apple" ? (
  //           <AppleMusicPartyRoomPlayerCard
  //             selectedSong={currentlyPlayingSong}
  //           />
  //         ) : (
  //           <SpotifyPartyRoomPlayerV2
  //             isSongOver={isSongOver}
  //             setIsSongOver={setIsSongOver}
  //             selectedSong={songPlaying}
  //           />
  //         )}
  //         <PartyRoomChat />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default PartyPage;

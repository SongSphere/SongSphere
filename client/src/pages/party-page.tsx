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
import SpotifyPartyRoomPlayerCard from "../components/player/spotify-party-player";

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

    setCurrentlyPlayingSong(songsList[0]);
  }, []);

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
                        navigate(`/`);
                        window.location.reload();
                      });
                    } else {
                      await DeleteMember(room, user.username).then(() => {
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
                    onClick={() => {}}
                  >
                    Transfer
                  </button>
                ) : (
                  <div></div>
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
        {service === "apple" ? (
          <AppleMusicPlayerCard selectedSong={currentlyPlayingSong} />
        ) : (
          <SpotifyPartyRoomPlayerCard
            songsList={songsList}
            selectedSong={currentlyPlayingSong}
          />
        )}
      </div>
    </div>
  );
};

export default PartyPage;

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

const songsList = [
  {
    name: "Mo Bamba",
    artist: "Sheck Wes",
    albumName: "MUDBOY",
    id: "1xzBco0xcoJEDXktl7Jxrr",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b27359cd47039c5b10ed919fbaa8",
  },
  {
    name: "monster",
    artist: "21 Savage",
    albumName: "i am > i was",
    id: "2FUNBaa5DwItJtYEBgAblU",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b273280689ecc5e4b2038bb5e4bd",
  },
  {
    name: "Money Trees",
    artist: "Kendrick Lamar",
    albumName: "good kid, m.A.A.d city",
    id: "2HbKqm4o0w5wEeEFXm2sD4",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797",
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
          <SpotifyPlayerCard selectedSong={currentlyPlayingSong} />
        )}
      </div>
    </div>
  );
};

export default PartyPage;

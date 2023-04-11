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
import AppleMusicPartyRoomPlayerCard from "../components/party-room/apple-music-party-player";
import SpotifyPartyRoomPlayerCard from "../components/party-room/spotify-music-party-player";

const PartyPage = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [room, setRoom] = useState<TPartyRoom | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [song, setSong] = useState<TMusicContent | null>(null);

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
          <PartyRoomQueue />
        </div>
        {service === "apple" ? (
          <AppleMusicPartyRoomPlayerCard selectedSong={song} />
        ) : (
          <SpotifyPartyRoomPlayerCard selectedSong={song} />
        )}
      </div>
    </div>
  );
};

export default PartyPage;

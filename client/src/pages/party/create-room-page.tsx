import { useEffect, useState } from "react";
import AppleMusicPlayerCard from "../../components/player/apple-music-player-card";
import SpotifyPlayerCard from "../../components/player/spotify-music-player-card";
import { TUser } from "../../types/user";
import { TMusicContent } from "../../types/music-content";
import Session from "../../session";
import { randomSongSpotifyFromBackend } from "../../services/spotify/spotify-search";
import FriendActivityCard from "../../components/feed/friend-activity";
import Navbar from "../../components/navbar";
import RandomSongPost from "../../components/feed/random-song-content";
import { TPartyRoom } from "../../types/party-room";
import CreateRoom from "../../services/party/createRoom";
import fetchRoomByOwner from "../../services/party/fetch-room-by-owner";
import { useNavigate } from "react-router-dom";
import fetchRoomById from "../../services/party/fetch-room-by-id";
import SucessFailPopUp from "../../components/popup/sucess-fail-popup";

const CreateRoomPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");

  const ERROR_MSG = "Oh no! An error occurs when creating the party room";

  const [failText, setFailText] = useState<string>("");

  let navigate = useNavigate();

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
  }, [user]);

  if (!user) {
    return <div>fethcing user</div>;
  }

  return (
    <div className="w-full h-full min-h-screen bg-lblue min-w-screen">
      <SucessFailPopUp sucessFailText={failText} />
      <Navbar />
      <div className="grid grid-cols-4 gap-2 md:grid-flow-col">
        <FriendActivityCard />
        <div className="col-span-2">
          <div className="w-full h-full min-h-screen bg-lblue ">
            <div className="grid p-5 m-5 bg-white h-80 rounded-xl place-content-center">
              <h1 className="text-3xl text-center text-navy">
                Create A Party Room
              </h1>
              <div className="flex mt-4">
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
                className="p-5 mt-4 text-white rounded-xl bg-navy"
                onClick={async () => {
                  if (user) {
                    const newRoom: TPartyRoom = {
                      ownerUsername: user.username,
                      ownerEmail: user.email,
                      partyName: name,
                      description: description,
                      members: [],
                      queue: [],
                      musicIndex: 0,
                    };
                    await CreateRoom(newRoom)
                      .then((res) => {
                        if (!res) {
                          setFailText(ERROR_MSG);
                        } else {
                          setFailText("");
                          fetchRoomByOwner(newRoom.ownerUsername).then(
                            (room) => {
                              navigate(`/party/${room._id}`);
                              window.location.reload();
                            }
                          );
                        }
                      })
                      .catch((error) => {
                        setFailText(ERROR_MSG);
                      });
                  }
                }}
              >
                Create
              </button>
            </div>
            <div className="grid h-64 p-5 m-5 bg-white rounded-xl place-content-center">
              <h1 className="text-3xl text-center text-navy">
                Enter An Existing Party Room
              </h1>
              <div className="flex mt-4">
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
                className="p-3 mt-4 text-white rounded-xl bg-navy"
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
                Enter
              </button>
            </div>
          </div>
        </div>
        {service === "apple" ? (
          <AppleMusicPlayerCard selectedSong={song} />
        ) : (
          <SpotifyPlayerCard selectedSong={song} />
        )}
      </div>
    </div>
  );
};

export default CreateRoomPage;

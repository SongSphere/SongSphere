import { useEffect, useState } from "react";
import { TUser } from "../../types/user";
import Session from "../../session";
import { TPartyRoom } from "../../types/party-room";
import CreateRoom from "../../services/party/createRoom";
import fetchRoomByOwner from "../../services/party/fetch-room-by-owner";
import { useNavigate } from "react-router-dom";
import fetchRoomById from "../../services/party/fetch-room-by-id";
import FailPopUp from "../../components/popup/fail-popup";
import RemoveInvitation from "../../services/party/remove-invitation";
import AddMember from "../../services/party/add-member";
import EvenLayout from "../../layouts/even-layout";

const CreateRoomPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [enterFailOpen, setEnterFailOpen] = useState(false);

  const [partyFailOpen, setPartyFailOpen] = useState(false);

  const ERROR_MSG = "Oh no! An error occurs when creating the party room";
  let navigate = useNavigate();

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  if (user.partyRoom) {
    navigate(`/party/${user.partyRoom}`);
  }

  const middle = (
    <div>
      <FailPopUp
        open={enterFailOpen}
        setOpen={setEnterFailOpen}
        failText={ERROR_MSG}
      />
      <div className="w-full h-full ">
        <div className="grid bg-white h-80 rounded-xl place-content-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-3xl text-center text-navy">
              Create A Party Room
            </h1>
            <div className="flex mt-4">
              <label className="text-xl text-navy">Name: </label>
              <input
                className="e-input"
                type="text"
                value={name}
                placeholder={"Enter Party Room Name"}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex">
              <label className="text-xl text-navy">Description: </label>
              <input
                className="e-input"
                type="text"
                value={description}
                placeholder={"Enter Description"}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="p-3 mt-4 text-white rounded-xl bg-navy"
                onClick={async () => {
                  if (user) {
                    const newRoom: TPartyRoom = {
                      ownerUsername: user.username,
                      ownerEmail: user.email,
                      partyName: name,
                      description: description,
                      members: [user.username],
                      invitedMembers: [],
                      queue: [],
                      musicIndex: 0,
                      blocked: [],
                      chats: [],
                    };
                    await CreateRoom(newRoom)
                      .then((res) => {
                        if (!res) {
                          setEnterFailOpen(true);
                        } else {
                          fetchRoomByOwner(newRoom.ownerUsername).then(
                            (room) => {
                              if (room._id) {
                                user.partyRoom = room._id;
                                navigate(`/party/${room._id}`);
                              }
                            }
                          );
                        }
                      })
                      .catch((error) => {
                        setEnterFailOpen(true);
                      });
                  }
                }}
              >
                Create
              </button>
            </div>
          </form>
        </div>
        <div className="grid h-64 mt-5 bg-white rounded-xl place-content-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-3xl text-center text-navy">
              Enter An Existing Party Room
            </h1>
            <div className="flex mt-4">
              <h1 className="text-xl text-navy">Room Id:</h1>
              <label>
                <input
                  className="e-input"
                  type="text"
                  value={id}
                  placeholder={"Enter Party Room Id"}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  required
                />
              </label>
            </div>

            <div className="flex justify-center w-full">
              <FailPopUp
                open={partyFailOpen}
                setOpen={setPartyFailOpen}
                failText={"Room does not exist"}
              />
              <button
                type="submit"
                className="p-3 mt-4 text-white rounded-xl bg-navy"
                onClick={() => {
                  fetchRoomById(id)
                    .then((res) => {
                      if (res && res._id) {
                        
                        user.partyRoom = res._id;
                        res.members.push(user.username);
                        navigate(`/party/${res._id}`);
                        RemoveInvitation(res._id.toString(), user.username);
                      } else {
                      }
                    })
                    .then((error) => {
                      setPartyFailOpen(true);
                    });
                }}
              >
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return <EvenLayout left={<div></div>} middle={middle} right={<div></div>} />;
};

export default CreateRoomPage;

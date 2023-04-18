import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PartyRoomLayout from "../../layouts/party-room-layout";
import AddMember from "../../services/party/add-member";
import fetchRoomById from "../../services/party/fetch-room-by-id";
import Session from "../../session";
import { TMusicContent } from "../../types/music-content";
import { TPartyRoom } from "../../types/party-room";
import { TUser } from "../../types/user";
import PartyInfoCard from "./party-info-card";

const PartyRoomPage = () => {
  const left = <div>left</div>;
  const middle = <div>middle</div>;
  const right = <div>right</div>;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchRoomById(id).then((res) => {
        if (res == null) {
          navigate("/404");
        }
        setRoom(res);
      });
    }
  }, []);

  let navigate = useNavigate();

  const ERROR_MSG = "Oh no! An error occurs when deleting the party room";

  const [room, setRoom] = useState<TPartyRoom | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setUser(Session.getUser());
    setService(Session.getMusicService());
    if (user && id) {
      user.partyRoom = id;
    }
  }, [user, id]);

  useEffect(() => {
    if (room) {
      if (user && room._id) {
        if (!room.members.includes(user.username)) {
          AddMember(room._id, user.username);
          window.location.reload();
        }
      }
    }
  }, [room]);

  if (!user) {
    return <div>fetching user</div>;
  }

  if (!room || !id) {
    return (
      <div>
        <div></div>
      </div>
    );
  }

  return (
    <PartyRoomLayout
      left={<PartyInfoCard user={user} room={room} song={song} id={id} />}
      middle={middle}
      right={right}
    />
  );
};

export default PartyRoomPage;

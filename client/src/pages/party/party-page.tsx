import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppleMusicPartyRoomPlayerCard from "../../components/party-room/apple-music-party-player";
import PartyRoomQueue from "../../components/party-room/party-queue";
import SpotifyPartyRoomPlayerV2 from "../../components/party-room/spotify-party-player-v2";
import PartyRoomLayout from "../../layouts/party-room-layout";
import AddMember from "../../services/party/add-member";
import fetchQueue from "../../services/party/fetch-queue";
import fetchRoomById from "../../services/party/fetch-room-by-id";
import Session from "../../session";
import { TMusicContent } from "../../types/music-content";
import { TPartyRoom } from "../../types/party-room";
import { TUser } from "../../types/user";
import PartyInfoCard from "./party-info-card";

const PartyPage = () => {
  const { id } = useParams();

  const [currentlyPlayingSong, setCurrentlyPlayingSong] =
    useState<TMusicContent | null>(null);
  const [upNext, setUpNext] = useState<TMusicContent[] | null>(null);
  const upNextRef = useRef<TMusicContent[] | null>(null);
  const queueRef = useRef<TMusicContent[] | null>(null);
  const [queueIndex, setQueueIndex] = useState(0);
  const [songPlaying, setSongPlaying] = useState<TMusicContent | null>(null);
  const [isSongOver, setIsSongOver] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const updateQueue = async () => {
      console.log("called updated Queue");
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
        console.log(newQueue);
        // Only update the songPlaying state if the queue was empty before
        if (!songPlaying) {
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
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const playNextSong = () => {
      if (upNextRef.current && queueRef.current) {
        console.log(
          "next song. index, upnext, queue: ",
          queueIndex,
          upNextRef.current,
          queueRef.current
        );
        setIsSongOver(false);

        upNextRef.current = queueRef.current.slice(queueIndex + 1);
        setSongPlaying(upNextRef.current[0]);

        setUpNext(upNextRef.current.slice(1));
        setQueueIndex(queueIndex + 1);
      }
    };

    if (isSongOver) {
      playNextSong();
    }
  }, [isSongOver]);

  let navigate = useNavigate();

  const [room, setRoom] = useState<TPartyRoom | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");

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
        }
      }
    }
  }, [room]);

  if (!user || !room || !id) {
    return <div>loading</div>;
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
      left={<PartyInfoCard user={user} room={room} id={id} />}
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
};

export default PartyPage;

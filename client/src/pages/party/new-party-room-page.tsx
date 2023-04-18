import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PartyRoomLayout from "../../layouts/party-room-layout";
import AddMember from "../../services/party/add-member";
import fetchQueue from "../../services/party/fetch-queue";
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

  // const [isLoading, setIsLoading] = useState(true);
  const [currentlyPlayingSong, setCurrentlyPlayingSong] =
    useState<TMusicContent | null>(null);
  const [showListenersModal, setShowListenersModal] = useState(false);
  const [partyFailOpen, setPartyFailOpen] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [partyRoom, setPartyRoom] = useState<TPartyRoom | null>(null);

  const [queue, setQueue] = useState<TMusicContent[] | null>(null);
  const [upNext, setUpNext] = useState<TMusicContent[] | null>(null);
  const upNextRef = useRef<TMusicContent[] | null>(null);
  const queueRef = useRef<TMusicContent[] | null>(null);
  const [queueIndex, setQueueIndex] = useState(0);
  const [songPlaying, setSongPlaying] = useState<TMusicContent | null>(null);
  const [isSongOver, setIsSongOver] = useState<boolean>(false);

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
        }
      }
    }
  }, [room]);

  if (!user || !room || !id) {
    return <div>loading</div>;
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

import { useNavigate, useParams } from "react-router-dom";
import { TUser } from "../../types/user";
import { TPartyRoom } from "../../types/party-room";
import { useEffect, useRef, useState } from "react";
import fetchRoomById from "../../services/party/fetch-room-by-id";
import Session from "../../session";
import { TMusicContent } from "../../types/music-content";
import PartyRoomQueue from "../../components/party-room/party-queue";
import AddMember from "../../services/party/add-member";
import AppleMusicPartyRoomPlayerCard from "../../components/party-room/apple-music-party-player";
import fetchQueue from "../../services/party/fetch-queue";
import SpotifyPartyRoomPlayerV2 from "../../components/party-room/spotify-party-player-v2";
import PartyRoomLayout from "../../layouts/party-room-layout";
import PartyInfoCard from "../../components/party-room/party-info-card";
import PartyRoomChat from "../../components/party-room/party-chat";
import updateQueueIndex from "../../services/party/update-queue-index";
import fetchBlocked from "../../services/party/fetch-blocked";

interface IQueue {
  queue: TMusicContent[];
  index: number;
}

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
  const [blocked, setBlocked] = useState<boolean>(false);
  const blockRef = useRef<boolean>(false);

  useEffect(() => {
    const playNextSong = () => {
      if (isSongOver) {
        if (user && room) {
          if ((user.username = room?.ownerUsername)) {
            if (upNextRef.current && queueRef.current) {
              console.log("next song. index: ", queueIndex);
              console.log("upnext", upNextRef.current);
              console.log("current", queueRef.current);

              setIsSongOver(false);

              upNextRef.current = queueRef.current.slice(queueIndex + 1);
              console.log("setting current song 1", upNextRef.current);
              setSongPlaying(upNextRef.current[0]);

              setUpNext(upNextRef.current.slice(1));

              if (user && room) {
                if ((user.username = room?.ownerUsername)) {
                  updateQueueIndex(queueIndex + 1);
                }
              }

              setQueueIndex(queueIndex + 1);
            }
          }
        }
      }
    };

    playNextSong();
  }, [isSongOver]);

  useEffect(() => {
    // Fetch user and set service
    const fetchUserData = async () => {
      const fetchedUser = Session.getUser();
      const fetchedService = Session.getMusicService();

      if (id) {
        fetchRoomById(id).then((res) => {
          if (res == null) {
            console.log("It is null");
            navigate("/404");
          }

          if (fetchedUser && res._id) {
            if (!res.members.includes(fetchedUser.username)) {
              AddMember(res._id, fetchedUser.username);
            }
          }

          if (user && id) {
            user.partyRoom = id;
          }

          setRoom(res);
        });
      }

      setUser(fetchedUser);
      setService(fetchedService);
      setIsLoading(false);
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    let mounted = true;

    const updateQueue = async () => {
      let newQueue;

      if (id) {
        newQueue = await fetchQueue(id);
      }

      if (
        newQueue?.queue &&
        (JSON.stringify(newQueue?.queue) !== JSON.stringify(queueRef.current) ||
          newQueue.index != queueIndex) &&
        mounted
      ) {
        queueRef.current = newQueue.queue;
        if (newQueue.index != queueIndex) {
          setQueueIndex(newQueue.index);
          console.log("queue index changed bruh");
          setSongPlaying(newQueue.queue[newQueue.index]);
        }
        // Only update the songPlaying state if the upnext queue was empty before
        if (!songPlaying) {
          setSongPlaying(newQueue.queue[newQueue.index]);
        }
        upNextRef.current = newQueue.queue.slice(newQueue.index + 1);
        setUpNext(newQueue.queue.slice(newQueue.index + 1));
      }
    };

    const interval = setInterval(updateQueue, 200);

    return () => {
      clearInterval(interval);
      mounted = false;
    };
  }, [id, songPlaying]);

  useEffect(() => {
    let mounted = true;

    const updateQueue = async () => {
      let newBool;

      if (user && id) {
        newBool = (await fetchBlocked(id)).includes(user.username);
      }

      if (
        newBool &&
        JSON.stringify(newBool) !== JSON.stringify(queueRef.current) &&
        mounted
      ) {
        blockRef.current = newBool;

        setBlocked(newBool);
      }
    };

    const interval = setInterval(updateQueue, 500);

    return () => {
      clearInterval(interval);
      mounted = false;
    };
  }, [user, id]);

  useEffect(() => {
    let mounted = true;
    const updateRoom = async () => {
      let newRoom;
      if (id) {
        newRoom = await fetchRoomById(id);
      }
      if (newRoom == null && user?.username !== room?.ownerUsername) {
        navigate("/party/ended");
      }
    };
    const interval = setInterval(updateRoom, 500);
    return () => {
      clearInterval(interval);
      mounted = false;
    };
  }, [room, user]);

  if (isLoading || !user || !queueRef.current || !room || !id) {
    return <div>Loading...</div>;
  }

  if (blocked) {
    user.partyRoom = "";
    navigate("/party/blocked");
  }
  const left = (
    <div className="w-full h-full bg-slate-900">
      {service === "apple" ? (
        <AppleMusicPartyRoomPlayerCard
          isSongOver={isSongOver}
          setIsSongOver={setIsSongOver}
          selectedSong={songPlaying}
        />
      ) : (
        <SpotifyPartyRoomPlayerV2
          isSongOver={isSongOver}
          setIsSongOver={setIsSongOver}
          selectedSong={songPlaying}
        />
      )}
      <div className="hidden w-full lg:block">
        <PartyRoomChat room={room} />
      </div>
    </div>
  );

  return (
    <PartyRoomLayout
      left={
        <div>
          <PartyInfoCard
            user={user}
            currentlyPlayingSong={currentlyPlayingSong}
            room={room}
            id={id}
          />
          <div className="w-full bg-slate-900 lg:hidden">
            <PartyRoomChat room={room} />
          </div>
        </div>
      }
      middle={
        <PartyRoomQueue
          queueIndex={queueIndex}
          currentlyPlayingSong={songPlaying}
          upNextSongs={upNext}
        />
      }
      right={left}
    />
  );
};

export default PartyPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import AppleMusicPlayerCard from "../../components/player/apple-music-player-card";
import SpotifyPlayerCard from "../../components/player/spotify-music-player-card";
import { NoPosts } from "../../components/profile/no-post";
import OtherProfileFeed from "../../components/profile/other-profile-feed";
import OtherUserProfileCard from "../../components/profile/other-user-profile-card";
import fetchPostsByUsername from "../../services/posts/fetch-user-posts";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import Session from "../../session";
import { TMusicContent } from "../../types/music-content";
import { TPost } from "../../types/post";
import { TUser } from "../../types/user";

interface IOtherUserProfileProps {
  appleMusicInstance: MusicKit.MusicKitInstance;
}

const OtherUserProfilePage = (props: IOtherUserProfileProps) => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [post, setPost] = useState<TPost | null>(null);
  const [isFollowing, setFollowing] = useState<boolean>(false);

  const [service, setService] = useState("");
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  let { username } = useParams();

  useEffect(() => {
    if (username) {
      fetchUserByUsername(username).then((user) => {
        setSelectedUser(user);
      });
    }
    setService(Session.getMusicService());
    setUser(Session.getUser());
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchPostsByUsername(selectedUser.username).then((posts) => {
        setPosts(posts);
      });
    }

    // Test if this works
    if (selectedUser && user) {
      for (let i = 0; i < selectedUser.followers.length; i++) {
        console.log(`cur followers: ${selectedUser.followers[i]}`);
        if (user.username == selectedUser.followers[i]) {
          console.log(`${user.username} is following ${selectedUser.username}`);
          setFollowing(true);
          break;
        }
      }
    }
  }, [selectedUser, user]);

  if (!selectedUser && service) {
    return <div>fetching user</div>;
  }

  if (isFollowing) {
    console.log("Is following");
  } else {
    console.log("Not following");
  }

  if (!user) {
    return <div>fetching</div>;
  }

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-lblue">
      <Navbar />
      <div className="grid grid-cols-4 gap-8 md:grid-flow-col">
        <div className="">
          <OtherUserProfileCard selectedUser={selectedUser} user={user} />
        </div>
        <div className="col-span-2">
          {/* Means it should be T && T */}
          {!(isFollowing && posts.length > 0) ? (
            <NoPosts />
          ) : (
            <OtherProfileFeed
              posts={posts}
              setSong={setSong}
              setPost={setPost}
              selectedUser={selectedUser}
              blur={!isFollowing}
              user={user}
            />
          )}
        </div>
        {service === "apple" ? (
          <AppleMusicPlayerCard
            musicInstance={props.appleMusicInstance}
            selectedSong={song}
          />
        ) : (
          <SpotifyPlayerCard
            selectedSong={song}
            appleMusicInstance={props.appleMusicInstance}
          />
        )}
      </div>
    </div>
  );
};

export default OtherUserProfilePage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import AppleMusicPlayerCard from "../../components/player/apple-music-player-card";
import SpotifyPlayerCard from "../../components/player/spotify-music-player-card";
import FollowerList from "../../components/profile/follower-list";
import FollowingList from "../../components/profile/following-list";
import { NoPosts } from "../../components/profile/no-post";
import OtherProfileFeed from "../../components/profile/other-profile-feed";
import OtherUserProfileCard from "../../components/profile/other-user-profile-card";
import fetchPostsByUsername from "../../services/post/fetch-user-posts";
import fetchUserByUsername from "../../services/user/fetch-user-username";
import Session from "../../session";
import { TMusicContent } from "../../types/music-content";
import { TPost } from "../../types/post";
import { TUser } from "../../types/user";

const OtherUserProfilePage = () => {
  const [following, setFollowing] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [post, setPost] = useState<TPost | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const [service, setService] = useState("");
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  let { username } = useParams();

  const handleFollowingOpen = () => {
    setShowFollowingModal(true);
  };
  const handleFollowingClose = () => {
    setShowFollowingModal(false);
  };

  const handleFollowerOpen = () => {
    setShowFollowerModal(true);
  };
  const handleFollowerClose = () => {
    setShowFollowerModal(false);
  };

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
        if (user.username == selectedUser.followers[i]) {
          setIsFollowing(true);
          break;
        }
      }
    }
  }, [selectedUser, user]);

  useEffect(() => {
    if (selectedUser) {
      setFollowers(selectedUser.followers);
      setFollowing(selectedUser.following);
    }
  }, [selectedUser]);

  if (!selectedUser && service) {
    return <div>fetching user</div>;
  }

  if (!user || !selectedUser) {
    return <div>fetching</div>;
  }

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-lblue">
      <Navbar />
      <div className="grid grid-cols-4 gap-8 md:grid-flow-col">
        <div className="">
          <OtherUserProfileCard
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            followers={followers}
            setFollowers={setFollowers}
            openFollowersModal={handleFollowerOpen}
            openFollowingModal={handleFollowingOpen}
          />
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
          <AppleMusicPlayerCard selectedSong={song} />
        ) : (
          <SpotifyPlayerCard selectedSong={song} />
        )}
        <FollowingList
          following={following}
          isVisible={showFollowingModal}
          onClose={handleFollowingClose}
        />
        <FollowerList
          followers={followers}
          isVisible={showFollowerModal}
          onClose={handleFollowerClose}
        />
      </div>
    </div>
  );
};

export default OtherUserProfilePage;

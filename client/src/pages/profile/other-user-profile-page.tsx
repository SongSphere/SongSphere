// import packages
import { useEffect, useState } from "react";

// import types
import { TMusicContent } from "../../types/music-content";
import { TPost } from "../../types/post";
import { TUser } from "../../types/user";

// import components
import AppleMusicPlayerCard from "../../components/player/apple-music-player-card";
import SpotifyPlayerCard from "../../components/player/spotify-music-player-card";
import ProfileCard from "../../components/profile/profile-card";
import ProfileFeed from "../../components/profile/profile-feed";
import { NoPosts } from "../../components/profile/no-post";
import Session from "../../session";
import fetchPostsByUsername from "../../services/post/fetch-user-posts";
import FollowingList from "../../components/profile/following-list";
import FollowerList from "../../components/profile/follower-list";
import OtherUserProfileCard from "../../components/profile/other-user-profile-card";

import MainLayout from "../../layouts/main-layout";
import { useParams } from "react-router-dom";
import fetchUserByUsername from "../../services/user/fetch-user-username";

const ProfilePage = () => {
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");

  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [isPrivate, setIsPrivate] = useState<Boolean>();
  const [following, setFollowing] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);

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
    if (user) {
      fetchPostsByUsername(user.username).then((posts) => {
        setPosts(posts);
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedUser) {
      setFollowers(selectedUser.followers);
      setFollowing(selectedUser.following);
      fetchPostsByUsername(selectedUser.username).then((posts) => {
        setPosts(posts);
      });

      selectedUser.isPrivate ? setIsPrivate(true) : setIsPrivate(false);
    }
  }, [selectedUser, user]);

  if (!selectedUser && service) {
    return <div>fetching user</div>;
  }

  if (!user || !selectedUser) {
    return <div>fetching</div>;
  }

  const left = (
    <OtherUserProfileCard
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      followers={followers}
      setFollowers={setFollowers}
      openFollowersModal={handleFollowerOpen}
      openFollowingModal={handleFollowingOpen}
    />
  );

  const middle = (
    <div>
      {posts.length > 0 ? (
        <ProfileFeed posts={posts} setSong={setSong} user={user} />
      ) : (
        <NoPosts />
      )}
    </div>
  );

  const right = (
    <div>
      {service === "apple" ? (
        <AppleMusicPlayerCard selectedSong={song} />
      ) : (
        <SpotifyPlayerCard selectedSong={song} />
      )}
    </div>
  );

  return (
    <div>
      <MainLayout left={left} middle={middle} right={right} />
      <FollowingList
        following={user.following}
        isVisible={showFollowingModal}
        onClose={handleFollowingClose}
      />
      <FollowerList
        followers={user.followers}
        isVisible={showFollowerModal}
        onClose={handleFollowerClose}
      />
    </div>
  );
};

export default ProfilePage;

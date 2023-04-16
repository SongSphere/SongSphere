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

import MainLayout from "../../layouts/main-layout";

const ProfilePage = () => {
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [song, setSong] = useState<TMusicContent | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [service, setService] = useState<string>("");

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
    setUser(Session.getUser());
    setService(Session.getMusicService());
  }, [Session.getUser()]);

  useEffect(() => {
    if (user) {
      fetchPostsByUsername(user.username).then((posts) => {
        setPosts(posts);
      });
    }
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  const left = (
    <ProfileCard
      openFollowingModal={handleFollowingOpen}
      openFollowersModal={handleFollowerOpen}
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

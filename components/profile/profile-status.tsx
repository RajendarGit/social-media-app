import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const ProfileStatus = () => {
  const { posts } = useSelector((state: RootState) => state.posts);
  const { user } = useSelector((state: RootState) => state.auth);
  const userPosts = posts.filter((post) => post.userId === user?.id);
  const { friends } = useSelector((state: RootState) => state.friends);
  return (
    <div className="flex justify-center sm:justify-start space-x-8 mt-6 pt-6 border-t">
      <div className="text-center">
        <div className="text-xl font-bold">{userPosts.length}</div>
        <div className="text-sm text-gray-500">Posts</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold">{friends.length}</div>
        <div className="text-sm text-gray-500">Friends</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold">1.2k</div>
        <div className="text-sm text-gray-500">Followers</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold">892</div>
        <div className="text-sm text-gray-500">Following</div>
      </div>
    </div>
  );
};

export default ProfileStatus;

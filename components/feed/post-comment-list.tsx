import { imgPath } from "@/lib/utils";
import React from "react";
import { Avatar } from "../ui/avatar";
import AvatarImageContainer from "../layout/avatar-image-container";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const PostCommentList = ({ post }: { post: any }) => {
    const { friends, suggestedFriends } = useSelector((state: RootState) => state.friends)
    const getUserById = (userId: string) => {
        return (
          friends.find((f) => f.id === userId) ||
          suggestedFriends.find((f) => f.id === userId)
        )
      }
  return (
    <>
      {post.comments.map((comment: any) => {
        const user = getUserById(comment.userId);
        const avatarSrc = comment.userAvatar
          ? comment.userAvatar
          : user
          ? user.avatar
            ? user.avatar
            : user.gender === "male"
            ? imgPath("boy.webp")
            : imgPath("girl.webp")
          : "/placeholder.svg";
        return (
          <div key={comment.id} className="flex space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImageContainer
                avatarSrc={avatarSrc}
                avatarAlt={comment.userName}
                avatarName={comment.userName}
              />
            </Avatar>
            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <p className="font-semibold text-sm">{comment.userName}</p>
                <p className="text-sm">{comment.content}</p>
              </div>
              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                <span>{comment.timestamp}</span>
                <button className="hover:underline">Like</button>
                <button className="hover:underline">Reply</button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostCommentList;

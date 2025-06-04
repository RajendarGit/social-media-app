import React from "react";
import { CardHeader } from "../ui/card";
import { Avatar } from "../ui/avatar";
import AvatarImageContainer from "../layout/avatar-image-container";
import { getRelativeTime, imgPath } from "@/lib/utils";
import { Button } from "../ui/button";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const PostPostedPersonInfo = ({ post }: { post: any }) => {
  const { friends, suggestedFriends } = useSelector(
    (state: RootState) => state.friends
  );

  const getUserById = (userId: string) => {
    return (
      friends.find((f) => f.id === userId) ||
      suggestedFriends.find((f) => f.id === userId)
    );
  };
  
  const userForPost = getUserById(post.userId);

  const avatarSrc = userForPost
    ? userForPost.avatar
      ? userForPost.avatar
      : userForPost.gender === "male"
      ? imgPath("boy.webp")
      : imgPath("girl.webp")
    : "/placeholder.svg";

  return (
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImageContainer
              avatarSrc={avatarSrc}
              avatarAlt={userForPost ? userForPost.name : "Social Connect User"}
              avatarName={
                userForPost ? userForPost.name : "Social Connect User"
              }
            />
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{post.userName}</p>
            <p className="text-xs text-gray-500">
              {getRelativeTime(post.timestamp)}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save Post</DropdownMenuItem>
            <DropdownMenuItem>Hide Post</DropdownMenuItem>
            <DropdownMenuItem>Report Post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
  );
};

export default PostPostedPersonInfo;

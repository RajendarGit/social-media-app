import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { imgPath } from "@/lib/utils";
import AvatarImageContainer from "./avatar-image-container";
const OnlineFriends = () => {
  const { friends } = useSelector((state: RootState) => state.friends);
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3">Online Friends</h3>
        <div className="space-y-3">
          {friends
            .filter((f) => f.status === "online")
            .slice(0, 5)
            .map((friend) => (
              <div key={friend.id} className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImageContainer
                      avatarSrc={
                        friend.avatar
                          ? friend.avatar
                          : friend.gender === "male"
                          ? imgPath("boy.webp")
                          : imgPath("girl.webp")
                      }
                      avatarAlt={friend.name}
                      avatarName={friend.name}
                    />
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <span className="text-sm font-medium">{friend.name}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnlineFriends;

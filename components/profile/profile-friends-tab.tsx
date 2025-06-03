import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Badge } from "../ui/badge";
import { imgPath } from "@/lib/utils";

const ProfileFriendsTab = () => {
  const { friends } = useSelector((state: RootState) => state.friends);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Friends ({friends.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <div key={friend.id} className="text-center">
              <Avatar className="h-16 w-16 mx-auto mb-2">
                <AvatarImage
                  src={friend.avatar || friend.gender === "male" ? imgPath("boy.webp") : imgPath("girl.webp")}
                  alt={friend.name || "Social connect user"}
                />
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="font-medium text-sm">{friend.name}</p>
              <Badge
                variant={friend.status === "online" ? "default" : "secondary"}
                className="text-xs"
              >
                {friend.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileFriendsTab;

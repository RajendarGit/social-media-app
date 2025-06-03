import React from "react";
import { AvatarFallback, Avatar } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { addFriend } from "@/store/slices/friendsSlice";
import { imgPath } from "@/lib/utils";
import AvatarImageContainer from "./avatar-image-container";
const SuggestedFriends = () => {
  const { suggestedFriends } = useSelector((state: RootState) => state.friends);
  const dispatch = useDispatch();

  const handleAddFriend = (friend: any) => {
    dispatch(addFriend(friend));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <UserPlus className="h-5 w-5 mr-2" />
          People You May Know
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestedFriends.slice(0, 4).map((friend) => (
          <div key={friend.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
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
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{friend.name}</p>
                <p className="text-xs text-gray-500">
                  {friend.mutualFriends} mutual friends
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => handleAddFriend(friend)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add
            </Button>
          </div>
        ))}
        <Button variant="outline" className="w-full">
          See All Suggestions
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuggestedFriends;

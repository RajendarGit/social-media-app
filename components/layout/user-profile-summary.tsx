import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { MapPin, LinkIcon } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { imgPath } from "@/lib/utils";
import AvatarImageContainer from "./avatar-image-container";

const UserProfileSummary = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { friends } = useSelector((state: RootState) => state.friends);
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <CardTitle>
          <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <div className="absolute -bottom-6 left-4">
              <Avatar className="h-12 w-12 border-4 border-white">
                <AvatarImageContainer
                  avatarSrc={
                    user?.avatar
                      ? user?.avatar
                      : user?.gender === "male"
                      ? imgPath("boy.webp")
                      : imgPath("girl.webp")
                  }
                  avatarAlt={user?.name || "Social Connect User"}
                  avatarName={user?.name || "Social Connect User"}
                />
              </Avatar>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8 pb-4">
        <h3 className="font-semibold text-lg">{user?.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {user?.bio}
        </p>

        {user?.location && (
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {user.location}
          </div>
        )}

        {user?.website && (
          <div className="flex items-center text-sm text-blue-600 mb-3">
            <LinkIcon className="h-4 w-4 mr-1" />
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {user.website.replace("https://", "")}
            </a>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <div className="text-center">
            <div className="font-semibold">{friends.length}</div>
            <div className="text-gray-500">Friends</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">127</div>
            <div className="text-gray-500">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">1.2k</div>
            <div className="text-gray-500">Followers</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileSummary;

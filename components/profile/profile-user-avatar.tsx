import React, { useState } from "react";
import { Button } from "../ui/button";
import { Camera, Loader2 } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { imgPath } from "@/lib/utils";
import AvatarImageContainer from "../layout/avatar-image-container";

export const ProfileUserAvatar = ({
  handleFileChange,
}: {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  return (
    <div className="relative">
      <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
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
      <div className="absolute bottom-2 right-2">
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => document.getElementById("avatar-upload")?.click()}
          disabled={uploadingAvatar}
          className="h-8 w-8 p-0 rounded-full bg-white hover:bg-gray-100 border border-gray-200"
        >
          {uploadingAvatar ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4 dark:text-gray-500" />
          )}
        </Button>
      </div>
    </div>
  );
};

"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  ImageIcon,
  Heart,
  MessageCircle,
} from "lucide-react"
import ProfileBanner from "./profile-banner"
import { useProfileImageUpload } from "@/hooks/use-profile-image-upload"
import { ProfileUserAvatar } from "./profile-user-avatar"
import ProfileUserInfo from "./profile-user-info"
import ProfileStatus from "./profile-status"
import ProfileUserPostTab from "./profile-user-post-tab"
import ProfileFriendsTab from "./profile-friends-tab"
import ProfilePhotoTab from "./profile-photo-tab"
export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const { handleImageUpload } = useProfileImageUpload();
  // Create user folder name (sanitized)
  const getUserFolderName = (userName: string) => {
    return userName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  }

  

  

  const handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "banner"
  ) => void = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, type);
    }
    // Reset input value to allow re-uploading the same file
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        {/* Banner */}
        <ProfileBanner handleFileChange={(e) => handleFileChange(e, "banner")} />

        {/* Profile Info */}
        <CardContent className="relative pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 sm:-mt-12">
            {/* Avatar */}
            <ProfileUserAvatar handleFileChange={(e) => handleFileChange(e, "avatar")} />

            {/* User Info */}
            <ProfileUserInfo />
          </div>

          {/* Stats */}
          <ProfileStatus />
        </CardContent>
      </Card>

      {/* Profile Content */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <ProfileUserPostTab />
        </TabsContent>

        <TabsContent value="friends" className="space-y-4">
          <ProfileFriendsTab />
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <ProfilePhotoTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

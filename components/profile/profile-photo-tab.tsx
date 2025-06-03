import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { ImageIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";

const ProfilePhotoTab = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);
  const userPosts = posts.filter((post) => post.userId === user?.id);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ImageIcon className="h-5 w-5 mr-2" />
          Photos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {/* Sample photos from posts */}
          {userPosts
            .filter((post) => post.images && post.images.length > 0)
            .flatMap((post) => post.images || [])
            .slice(0, 9)
            .map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Photo ${index + 1}`}
                className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                width={100}
                height={100}
              />
            ))}
          {userPosts.filter((post) => post.images && post.images.length > 0)
            .length === 0 && (
            <div className="col-span-3 text-center py-8">
              <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">No photos yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePhotoTab;

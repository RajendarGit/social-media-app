import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ProfileUserPostTab = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);
  const userPosts = posts.filter((post) => post.userId === user?.id);
  return (
    <>
      {userPosts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start sharing your thoughts with the world!
            </p>
          </CardContent>
        </Card>
      ) : (
        userPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg"}
                    alt={user?.name}
                  />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{user?.name}</p>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <p className="mb-3">{post.content}</p>
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Post image ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {post.likes.length}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments.length}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default ProfileUserPostTab;

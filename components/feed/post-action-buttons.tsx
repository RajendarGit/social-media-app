import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart, MessageCircle, Share } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { likePost, sharePost } from "@/store/slices/postsSlice";

const PostActionButtons = ({ post, handleComment }: { post: any, handleComment: () => void }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth)
    const isLiked = post.likes.includes(user?.id || "")

    const handleLike = () => {
        dispatch(likePost({ postId: post.id, userId: user?.id || "" }))
      }
    
      const handleShare = () => {
        dispatch(sharePost(post.id))
      }

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={`flex-1 ${
          isLiked
            ? "text-red-500 hover:text-red-600"
            : "text-gray-600 hover:text-gray-700"
        }`}
      >
        <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
        Like
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleComment}
        className="flex-1 text-gray-600 hover:text-gray-700"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Comment
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="flex-1 text-gray-600 hover:text-gray-700"
      >
        <Share className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
};

export default PostActionButtons;

import React from "react";
import { Heart } from "lucide-react";
const PostStatus = ({ post }: { post: any }) => {
  return (
    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
      <div className="flex items-center space-x-4">
        {post.likes.length > 0 && (
          <span className="flex items-center">
            <Heart className="h-4 w-4 text-red-500 mr-1" />
            {post.likes.length}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {post.comments.length > 0 && (
          <span>{post.comments.length} comments</span>
        )}
        {post.shares > 0 && <span>{post.shares} shares</span>}
      </div>
    </div>
  );
};

export default PostStatus;

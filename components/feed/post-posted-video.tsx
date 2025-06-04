import React, { useState } from "react";
import { Button } from "../ui/button";

const PostPostedVideo = ({ post }: { post: any }) => {
  const [isAutoHeight, setIsAutoHeight] = useState(false);
  return (
    <>
      {post.video && (
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mt-3 mb-4">
          <video
            src={post.video}
            controls
            className={`w-full ${
              isAutoHeight ? "h-auto" : "h-full"
            } object-cover rounded-lg`}
            muted
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-black/50 text-white"
            onClick={() => setIsAutoHeight(!isAutoHeight)}
          >
            {isAutoHeight ? "Show Aspect Screen" : "Show Full Screen"}
          </Button>
        </div>
      )}
    </>
  );
};

export default PostPostedVideo;

import { EmbedLink } from '@/lib/healper'
import React from "react";

const PostPostedLink = ({ post }: { post: any }) => {
  return (
    <>
      {post.link && (
        <div className="mb-4 bg-gray-50 dark:bg-gray-800 mt-3">
          <EmbedLink link={post.link} />
        </div>
      )}
    </>
  );
};

export default PostPostedLink;

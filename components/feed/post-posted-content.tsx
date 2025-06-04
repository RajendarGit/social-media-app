import React from "react";

const PostPostedContent = ({ post }: { post: any }) => {
  return (
    <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap mb-3">
      {post.content}
    </p>
  );
};

export default PostPostedContent;

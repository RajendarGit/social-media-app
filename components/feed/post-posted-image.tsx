import Image from "next/image";
import React from "react";

const PostPostedImage = ({ post }: { post: any }) => {
  return (
    <>
      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          <div
            className={`grid gap-2 ${
              post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {post.images.map((image: string, index: number) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Post image ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity mt-3"
                width={500}
                height={500}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PostPostedImage;

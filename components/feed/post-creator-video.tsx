import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PostCreatorVideo = ({
  video,
  setVideo,
  handleVideoUpload,
}: {
  video: string;
  setVideo: (video: string) => void;
  handleVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <Label htmlFor="video" className="text-sm font-medium">
        Video URL
      </Label>
      <Input
        id="video"
        type="file"
        accept="video/*"
        className="mt-1"
        onChange={handleVideoUpload}
      />
      {video && (
        <div className="mt-2">
          <video
            src={video}
            controls
            className="w-full h-48 object-cover rounded"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default PostCreatorVideo;

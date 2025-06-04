import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Image from "next/image";

const PostCreatorImage = ({
  images,
  setImages,
  handleImageUpload,
}: {
  images: string[];
  setImages: (images: string[]) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <Label htmlFor="images" className="text-sm font-medium">
        Add Photos
      </Label>
      <Input
        id="images"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="mt-1"
      />
      {images.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <Image
                src={img}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded"
                width={100}
                height={100}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-0"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCreatorImage;

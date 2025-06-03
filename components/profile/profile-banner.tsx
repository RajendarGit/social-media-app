import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import Image from "next/image";
import { RootState } from "@/store/store";
import { Loader2, Camera } from "lucide-react";
import { useProfileImageUpload } from "@/hooks/use-profile-image-upload";
import { useState } from "react";

const ProfileBanner = ({handleFileChange}: {handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const { uploadingAvatar } = useProfileImageUpload();

  // Handle file input change
  

  return (
    <div className="relative h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <Image
        src={user?.banner || "/placeholder.svg?height=200&width=800"}
        alt="Profile banner"
        className="w-full h-full object-cover"
        width={800}
        height={200}
      />
      <div className="absolute top-4 right-4">
        <input
          type="file"
          id="banner-upload"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => document.getElementById("banner-upload")?.click()}
          disabled={uploadingBanner}
          className="bg-black/50 hover:bg-black/70 text-white border-0"
        >
          {uploadingBanner ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Camera className="h-4 w-4 mr-2" />
          )}
          {uploadingBanner ? "Uploading..." : "Edit Banner"}
        </Button>
      </div>
      {uploadingAvatar && <p>Uploading...</p>}
    </div>
  );
};

export default ProfileBanner;

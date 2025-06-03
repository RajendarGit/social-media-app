import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Calendar, Edit3, LinkIcon, MapPin, Save, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateProfile } from "@/store/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(160, "Bio must be less than 160 characters"),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
});

const ProfileUserInfo = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  });
  const [errors, setErrors] = useState<any>({});

  const handleSave = () => {
    try {
      profileSchema.parse(editForm);
      dispatch(updateProfile(editForm));
      setIsEditing(false);
      setErrors({});
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      }
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || "",
      bio: user?.bio || "",
      location: user?.location || "",
      website: user?.website || "",
    });
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="flex-1 mt-4 sm:mt-0">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="mt-1"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name[0]}</p>
            )}
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
              className="mt-1"
              maxLength={160}
            />
            <div className="flex justify-between mt-1">
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio[0]}</p>
              )}
              <span className="text-sm text-gray-500 ml-auto">
                {editForm.bio.length}/160
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={editForm.location}
              onChange={(e) =>
                setEditForm({ ...editForm, location: e.target.value })
              }
              className="mt-1"
              placeholder="City, Country"
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={editForm.website}
              onChange={(e) =>
                setEditForm({ ...editForm, website: e.target.value })
              }
              className="mt-1"
              placeholder="https://yourwebsite.com"
            />
            {errors.website && (
              <p className="text-sm text-red-500 mt-1">{errors.website[0]}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {user?.bio && (
            <p className="text-gray-600 dark:text-gray-400 mb-3">{user.bio}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {user?.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {user.location}
              </div>
            )}
            {user?.website && (
              <div className="flex items-center">
                <LinkIcon className="h-4 w-4 mr-1" />
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.website.replace("https://", "")}
                </a>
              </div>
            )}
            {user?.joinDate && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {user.joinDate}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUserInfo;

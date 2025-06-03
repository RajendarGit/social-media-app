// hooks/useProfileImageUpload.ts
"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { updateProfile } from "@/store/slices/authSlice"
import { toast } from "@/components/ui/use-toast"

type ImageType = "avatar" | "banner"

export const useProfileImageUpload = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)

  const getUserFolderName = (userName: string) => {
    return userName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const handleImageUpload = async (file: File, type: ImageType) => {
    if (!user) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, GIF, etc.)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    const setUploading = type === "avatar" ? setUploadingAvatar : setUploadingBanner
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)
      formData.append("userId", user.id)
      formData.append("userName", user.name)

      const response = await fetch("/api/upload-profile-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const result = await response.json()

      const updateData = type === "avatar"
        ? { avatar: result.imagePath }
        : { banner: result.imagePath }

      dispatch(updateProfile(updateData))

      toast({
        title: "Image uploaded successfully",
        description: `Your ${type === "avatar" ? "profile picture" : "banner image"} has been updated.`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return {
    handleImageUpload,
    uploadingAvatar,
    uploadingBanner,
  }
}

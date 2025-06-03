"use client"

import type React from "react"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ImageIcon, Video, Link, Smile } from "lucide-react"
import { z } from "zod"
import AvatarImageContainer from "../layout/avatar-image-container"
import { imgPath } from "@/lib/utils"

const postSchema = z.object({
  content: z.string().min(1, "Post content cannot be empty").max(500, "Post is too long"),
  images: z.array(z.string()).optional(),
  video: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
})

interface PostCreatorProps {
  onCreatePost: (postData: any) => void
}

export default function PostCreator({ onCreatePost }: PostCreatorProps) {
  const { user } = useSelector((state: RootState) => state.auth)
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [video, setVideo] = useState("")
  const [link, setLink] = useState("")
  const [showMediaOptions, setShowMediaOptions] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const postData = {
        content,
        images: images.length > 0 ? images : undefined,
        video: video || undefined,
        link: link || undefined,
      }

      postSchema.parse(postData)
      onCreatePost(postData)

      // Reset form
      setContent("")
      setImages([])
      setVideo("")
      setLink("")
      setShowMediaOptions(false)
      setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors)
      }
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const imageUrls = Array.from(files).map(() => "/placeholder.svg?height=300&width=400")
      setImages([...images, ...imageUrls])
    }
  }

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Avatar and Input */}
          <div className="flex space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImageContainer
                avatarSrc={user?.avatar ? user?.avatar : user?.gender === "male" ? imgPath("boy.webp") : imgPath("girl.webp")}
                avatarAlt={user?.name || "Social Connect User"}
                avatarName={user?.name || "Social Connect User"}
              />
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder={`What's on your mind, ${user?.name?.split(" ")[0]}?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[80px] resize-none border-0 focus:ring-0 text-lg placeholder:text-gray-500"
                maxLength={500}
              />
              {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content[0]}</p>}
            </div>
          </div>

          {/* Character Count */}
          <div className="flex justify-end">
            <span className={`text-sm ${content.length > 450 ? "text-red-500" : "text-gray-500"}`}>
              {content.length}/500
            </span>
          </div>

          {/* Media Options */}
          {showMediaOptions && (
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {/* Image Upload */}
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
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
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

              {/* Video URL */}
              <div>
                <Label htmlFor="video" className="text-sm font-medium">
                  Video URL
                </Label>
                <Input
                  id="video"
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Link */}
              <div>
                <Label htmlFor="link" className="text-sm font-medium">
                  Add Link
                </Label>
                <Input
                  id="link"
                  type="url"
                  placeholder="https://example.com"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="mt-1"
                />
                {errors.link && <p className="text-sm text-red-500 mt-1">{errors.link[0]}</p>}
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowMediaOptions(!showMediaOptions)}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <ImageIcon className="h-4 w-4 mr-1" />
                Photo
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowMediaOptions(!showMediaOptions)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Video className="h-4 w-4 mr-1" />
                Video
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowMediaOptions(!showMediaOptions)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Link className="h-4 w-4 mr-1" />
                Link
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
              >
                <Smile className="h-4 w-4 mr-1" />
                Feeling
              </Button>
            </div>

            <Button
              type="submit"
              disabled={!content.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

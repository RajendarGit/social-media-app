"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store"
import { updateProfile } from "@/store/slices/authSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, MapPin, LinkIcon, Calendar, Edit3, Save, X, ImageIcon, Heart, MessageCircle } from "lucide-react"
import { z } from "zod"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(160, "Bio must be less than 160 characters"),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
})

export default function ProfilePage() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { friends } = useSelector((state: RootState) => state.friends)
  const { posts } = useSelector((state: RootState) => state.posts)

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  })
  const [errors, setErrors] = useState<any>({})

  const userPosts = posts.filter((post) => post.userId === user?.id)

  const handleSave = () => {
    try {
      profileSchema.parse(editForm)
      dispatch(updateProfile(editForm))
      setIsEditing(false)
      setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors)
      }
    }
  }

  const handleCancel = () => {
    setEditForm({
      name: user?.name || "",
      bio: user?.bio || "",
      location: user?.location || "",
      website: user?.website || "",
    })
    setIsEditing(false)
    setErrors({})
  }

  const handleImageUpload = (type: "avatar" | "banner") => {
    // Simulate image upload
    const newImageUrl = "/placeholder.svg?height=200&width=200"
    if (type === "avatar") {
      dispatch(updateProfile({ avatar: newImageUrl }))
    } else {
      dispatch(updateProfile({ banner: newImageUrl }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        {/* Banner */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <img
            src={user?.banner || "/placeholder.svg?height=200&width=800"}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => handleImageUpload("banner")}
          >
            <Camera className="h-4 w-4 mr-2" />
            Edit Banner
          </Button>
        </div>

        {/* Profile Info */}
        <CardContent className="relative pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 sm:-mt-12">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2 h-8 w-8 p-0 rounded-full"
                onClick={() => handleImageUpload("avatar")}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="flex-1 mt-4 sm:mt-0">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="mt-1"
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name[0]}</p>}
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      className="mt-1"
                      maxLength={160}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.bio && <p className="text-sm text-red-500">{errors.bio[0]}</p>}
                      <span className="text-sm text-gray-500 ml-auto">{editForm.bio.length}/160</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="mt-1"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={editForm.website}
                      onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                      className="mt-1"
                      placeholder="https://yourwebsite.com"
                    />
                    {errors.website && <p className="text-sm text-red-500 mt-1">{errors.website[0]}</p>}
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
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>

                  {user?.bio && <p className="text-gray-600 dark:text-gray-400 mb-3">{user.bio}</p>}

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
          </div>

          {/* Stats */}
          <div className="flex justify-center sm:justify-start space-x-8 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-xl font-bold">{userPosts.length}</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{friends.length}</div>
              <div className="text-sm text-gray-500">Friends</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">1.2k</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">892</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {userPosts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Start sharing your thoughts with the world!</p>
              </CardContent>
            </Card>
          ) : (
            userPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="mb-3">{post.content}</p>
                  {post.images && post.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {post.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes.length}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments.length}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="friends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Friends ({friends.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-sm">{friend.name}</p>
                    <Badge variant={friend.status === "online" ? "default" : "secondary"} className="text-xs">
                      {friend.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {/* Sample photos from posts */}
                {userPosts
                  .filter((post) => post.images && post.images.length > 0)
                  .flatMap((post) => post.images || [])
                  .slice(0, 9)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                {userPosts.filter((post) => post.images && post.images.length > 0).length === 0 && (
                  <div className="col-span-3 text-center py-8">
                    <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No photos yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

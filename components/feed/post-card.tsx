"use client"

import React from "react"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store"
import { likePost, addComment, sharePost } from "@/store/slices/postsSlice"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Share, MoreHorizontal, Send } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AvatarImageContainer from "../layout/avatar-image-container"
import { imgPath } from "@/lib/utils"
import Image from "next/image"
import { getRelativeTime } from "@/lib/utils"
import { EmbedLink } from "@/lib/healper"

interface PostCardProps {
  post: {
    id: string
    userId: string
    userName: string
    userAvatar?: string
    content: string
    images?: string[]
    video?: string
    link?: string
    timestamp: string
    likes: string[]
    comments: Array<{
      id: string
      userId: string
      userName: string
      userAvatar?: string
      content: string
      timestamp: string
      likes: string[]
    }>
    shares: number
  }
}

export default function PostCard({ post }: PostCardProps) {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { friends, suggestedFriends } = useSelector((state: RootState) => state.friends)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [isAutoHeight, setIsAutoHeight] = useState(false)

  const isLiked = post.likes.includes(user?.id || "")

  const handleLike = () => {
    dispatch(likePost({ postId: post.id, userId: user?.id || "" }))
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        userId: user?.id || "",
        userName: user?.name || "Unknown User",
        userAvatar: user?.avatar,
        content: commentText,
        timestamp: "Just now",
        likes: [],
      }
      dispatch(addComment({ postId: post.id, comment: newComment }))
      setCommentText("")
    }
  }

  const handleShare = () => {
    dispatch(sharePost(post.id))
  }

  const getUserForPost = (userId: string) => {
    return (
      friends.find((f) => f.id === userId) ||
      suggestedFriends.find((f) => f.id === userId)
    )
  }

  const userForPost = getUserForPost(post.userId)
  const avatarSrc = userForPost
    ? userForPost.avatar
      ? userForPost.avatar
      : userForPost.gender === "male"
        ? imgPath("boy.webp")
        : imgPath("girl.webp")
    : "/placeholder.svg"

  const getUserById = (userId: string) => {
    return (
      friends.find((f) => f.id === userId) ||
      suggestedFriends.find((f) => f.id === userId)
    )
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImageContainer
                avatarSrc={avatarSrc}
                avatarAlt={userForPost ? userForPost.name : "Social Connect User"}
                avatarName={userForPost ? userForPost.name : "Social Connect User"}
              />
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.userName}</p>
              <p className="text-xs text-gray-500">{getRelativeTime(post.timestamp)}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save Post</DropdownMenuItem>
              <DropdownMenuItem>Hide Post</DropdownMenuItem>
              <DropdownMenuItem>Report Post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{post.content}</p>
        </div>

        {/* Post Media */}
        {post.images && post.images.length > 0 && (
          <div className="mb-4">
            <div className={`grid gap-2 ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
              {post.images.map((image, index) => (
                <Image
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                  width={500}
                  height={500}
                />
              ))}
            </div>
          </div>
        )}

        {post.video && (
          <div className="mb-4">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <video
                src={post.video}
                controls
                className={`w-full ${isAutoHeight ? "h-auto" : "h-full"} object-cover rounded-lg`}
              />
              <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-black/50 text-white" onClick={() => setIsAutoHeight(!isAutoHeight)}>
                {isAutoHeight ? "Show Aspect Screen" : "Show Full Screen"}
              </Button>
            </div>
          </div>
        )}

        {post.link && (
          <div className="mb-4 bg-gray-50 dark:bg-gray-800">
            <EmbedLink link={post.link} />
          </div>
        )}

        {/* Post Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-4">
            {post.likes.length > 0 && (
              <span className="flex items-center">
                <Heart className="h-4 w-4 text-red-500 mr-1" />
                {post.likes.length}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {post.comments.length > 0 && <span>{post.comments.length} comments</span>}
            {post.shares > 0 && <span>{post.shares} shares</span>}
          </div>
        </div>

        <Separator className="mb-3" />

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex-1 ${isLiked ? "text-red-500 hover:text-red-600" : "text-gray-600 hover:text-gray-700"}`}
          >
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex-1 text-gray-600 hover:text-gray-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare} className="flex-1 text-gray-600 hover:text-gray-700">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3">
            <Separator />

            {/* Add Comment */}
            <form onSubmit={handleComment} className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImageContainer
                  avatarSrc={user?.avatar ? user?.avatar : user?.gender === "male" ? imgPath("boy.webp") : imgPath("girl.webp")}
                  avatarAlt={user?.name || "Social Connect User"}
                  avatarName={user?.name || "Social Connect User"}
                />
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" disabled={!commentText.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Comments List */}
            {post.comments.map((comment) => {
              const user = getUserById(comment.userId);
              const avatarSrc = comment.userAvatar
                ? comment.userAvatar
                : user
                  ? user.avatar
                    ? user.avatar
                    : user.gender === "male"
                      ? imgPath("boy.webp")
                      : imgPath("girl.webp")
                  : "/placeholder.svg";
              return (
                <div key={comment.id} className="flex space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImageContainer
                      avatarSrc={avatarSrc}
                      avatarAlt={comment.userName}
                      avatarName={comment.userName}
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <p className="font-semibold text-sm">{comment.userName}</p>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{comment.timestamp}</span>
                      <button className="hover:underline">Like</button>
                      <button className="hover:underline">Reply</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store"
import { addPost } from "@/store/slices/postsSlice"
import PostCreator from "./post-creator"
import PostCard from "./post-card"
import { Loader2 } from "lucide-react"
import NoPostYest from "../layout/no-post-card"

export default function Feed() {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector((state: RootState) => state.posts)
  const { user } = useSelector((state: RootState) => state.auth)

  const handleCreatePost = (postData: any) => {
    const newPost = {
      id: Date.now().toString(),
      userId: user?.id || "1",
      userName: user?.name || "Unknown User",
      userAvatar: user?.avatar,
      content: postData.content,
      images: postData.images,
      video: postData.video,
      link: postData.link,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
      shares: 0,
    }
    dispatch(addPost(newPost))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Post Creator */}
      <PostCreator onCreatePost={handleCreatePost} />

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <NoPostYest />
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}

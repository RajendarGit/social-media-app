import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Avatar } from "../ui/avatar";
import AvatarImageContainer from "../layout/avatar-image-container";
import { imgPath } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addComment } from "@/store/slices/postsSlice";
import PostCommentList from "./post-comment-list";
const PostCommentSection = ({ post, showComments }: { post: any, showComments: boolean }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth)
    const [commentText, setCommentText] = useState("")
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
  return (
    <>
      {showComments && (
        <div className="space-y-3">
          <Separator className="mt-3 mb-5" />

          {/* Add Comment */}
          <form
            onSubmit={handleComment}
            className="flex items-center space-x-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarImageContainer
                avatarSrc={
                  user?.avatar
                    ? user?.avatar
                    : user?.gender === "male"
                    ? imgPath("boy.webp")
                    : imgPath("girl.webp")
                }
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
          <PostCommentList post={post} />
        </div>
      )}
    </>
  );
};

export default PostCommentSection;

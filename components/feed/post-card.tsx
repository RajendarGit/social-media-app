"use client";

import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { likePost, sharePost } from "@/store/slices/postsSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { imgPath } from "@/lib/utils";
import PostActionButtons from "./post-action-buttons";
import PostCommentSection from "./post-comment-section";
import PostStatus from "./post-status";
import PostPostedVideo from "./post-posted-video";
import PostPostedLink from "./post-posted-link";
import PostPostedImage from "./post-posted-image";
import PostPostedContent from "./post-posted-content";
import PostPostedPersonInfo from "./post-posted-person-info";

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  return (
    <Card className="animate-fade-in">
      <PostPostedPersonInfo post={post} />

      <CardContent className="pt-0">
        {/* Post Content */}
        <PostPostedContent post={post} />

        {/* Post Media */}
        <PostPostedImage post={post} />
        <PostPostedVideo post={post} />
        <PostPostedLink post={post} />
        {/* Post Stats */}

        <PostStatus post={post} />

        <Separator className="mb-3" />

        {/* Action Buttons */}
        <PostActionButtons
          post={post}
          handleComment={() => setShowComments(!showComments)}
        />

        {/* Comments Section */}
        <PostCommentSection post={post} showComments={showComments} />
      </CardContent>
    </Card>
  );
}

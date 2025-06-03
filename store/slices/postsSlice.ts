import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Post {
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
  comments: Comment[]
  shares: number
}

interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  timestamp: string
  likes: string[]
}

interface PostsState {
  posts: Post[]
  loading: boolean
}

const initialState: PostsState = {
  posts: [
    {
      id: "1",
      userId: "2",
      userName: "Sarah Johnson",
      userAvatar: "",
      content:
        "Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to inspire me. 🏔️✨",
      images: ["/placeholder.svg?height=400&width=600"],
      timestamp: "2 hours ago",
      likes: ["1", "3", "4"],
      comments: [
        {
          id: "1",
          userId: "3",
          userName: "Mike Chen",
          userAvatar: "",
          content: "Wow, that looks incredible! Which trail did you take?",
          timestamp: "1 hour ago",
          likes: ["1"],
        },
      ],
      shares: 2,
    },
    {
      id: "2",
      userId: "3",
      userName: "Mike Chen",
      userAvatar: "",
      content: "Working on a new project using React and TypeScript. The developer experience keeps getting better! 💻",
      timestamp: "4 hours ago",
      likes: ["1", "2"],
      comments: [],
      shares: 1,
    },
  ],
  loading: false,
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload)
    },
    likePost: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId)
      if (post) {
        const index = post.likes.indexOf(action.payload.userId)
        if (index > -1) {
          post.likes.splice(index, 1)
        } else {
          post.likes.push(action.payload.userId)
        }
      }
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId)
      if (post) {
        post.comments.push(action.payload.comment)
      }
    },
    sharePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload)
      if (post) {
        post.shares += 1
      }
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { addPost, likePost, addComment, sharePost, setPosts, setLoading } = postsSlice.actions
export default postsSlice.reducer

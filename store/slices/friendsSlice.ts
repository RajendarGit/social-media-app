import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Friend {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline" | "away"
  mutualFriends: number
  gender: string
}

interface FriendsState {
  friends: Friend[]
  suggestedFriends: Friend[]
  friendRequests: Friend[]
}

const initialState: FriendsState = {
  friends: [
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "",
      status: "online",
      mutualFriends: 12,
      gender: "female",
    },
    {
      id: "3",
      name: "Mike Chen",
      avatar: "",
      status: "away",
      mutualFriends: 8,
      gender: "male",
    },
  ],
  suggestedFriends: [
    {
      id: "4",
      name: "Emma Wilson",
      avatar: "",
      status: "offline",
      mutualFriends: 5,
      gender: "female",
    },
    {
      id: "5",
      name: "David Brown",
      avatar: "",
      status: "online",
      mutualFriends: 3,
      gender: "male",
    },
  ],
  friendRequests: [],
}

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    addFriend: (state, action: PayloadAction<Friend>) => {
      state.friends.push(action.payload)
      state.suggestedFriends = state.suggestedFriends.filter((f) => f.id !== action.payload.id)
    },
    removeFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter((f) => f.id !== action.payload)
    },
    sendFriendRequest: (state, action: PayloadAction<string>) => {
      const friend = state.suggestedFriends.find((f) => f.id === action.payload)
      if (friend) {
        state.friendRequests.push(friend)
        state.suggestedFriends = state.suggestedFriends.filter((f) => f.id !== action.payload)
      }
    },
  },
})

export const { addFriend, removeFriend, sendFriendRequest } = friendsSlice.actions
export default friendsSlice.reducer

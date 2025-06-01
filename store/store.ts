import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import postsSlice from "./slices/postsSlice"
import themeSlice from "./slices/themeSlice"
import friendsSlice from "./slices/friendsSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    theme: themeSlice,
    friends: friendsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  banner?: string
  bio?: string
  location?: string
  website?: string
  joinDate: string
  gender: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem("user")
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem("user", JSON.stringify(state.user))
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setUser, logout, updateProfile, setLoading } = authSlice.actions
export default authSlice.reducer

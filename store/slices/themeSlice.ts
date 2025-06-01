import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type ThemeMode = "light" | "dark"
type ThemeColor = "blue" | "red" | "green" | "purple" | "orange" | "pink"

interface ThemeState {
  mode: ThemeMode
  color: ThemeColor
}

const initialState: ThemeState = {
  mode: "light",
  color: "blue",
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
      localStorage.setItem("themeMode", action.payload)
    },
    setThemeColor: (state, action: PayloadAction<ThemeColor>) => {
      state.color = action.payload
      localStorage.setItem("themeColor", action.payload)
    },
    initializeTheme: (state) => {
      const storedMode = localStorage.getItem("themeMode") as ThemeMode
      const storedColor = localStorage.getItem("themeColor") as ThemeColor
      if (storedMode) state.mode = storedMode
      if (storedColor) state.color = storedColor
    },
  },
})

export const { setThemeMode, setThemeColor, initializeTheme } = themeSlice.actions
export default themeSlice.reducer

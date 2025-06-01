"use client"

import type React from "react"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store"
import { initializeTheme } from "@/store/slices/themeSlice"

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch()
  const { mode, color } = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    dispatch(initializeTheme())
  }, [dispatch])

  useEffect(() => {
    const root = document.documentElement

    // Apply theme mode
    if (mode === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Apply theme color
    root.setAttribute("data-theme", color)
  }, [mode, color])

  return <>{children}</>
}

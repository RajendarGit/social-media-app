"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store"
import { setUser } from "@/store/slices/authSlice"
import LoginPage from "@/components/auth/login-page"
import MainLayout from "@/components/layout/main-layout"

export default function Home() {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)))
    }
  }, [dispatch])

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <MainLayout />
}

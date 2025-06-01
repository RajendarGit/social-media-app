"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store"
import { logout } from "@/store/slices/authSlice"
import { setThemeMode, setThemeColor } from "@/store/slices/themeSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Facebook,
  Search,
  Home,
  Users,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  User,
  Moon,
  Sun,
  Palette,
} from "lucide-react"

interface HeaderProps {
  onNavigate: (page: "feed" | "profile") => void
  currentPage: "feed" | "profile"
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { mode, color } = useSelector((state: RootState) => state.theme)
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = () => {
    dispatch(logout())
  }

  const toggleThemeMode = () => {
    dispatch(setThemeMode(mode === "light" ? "dark" : "light"))
  }

  const handleColorChange = (newColor: string) => {
    dispatch(setThemeColor(newColor as any))
  }

  const colorOptions = [
    { name: "Blue", value: "blue", class: "bg-blue-500" },
    { name: "Red", value: "red", class: "bg-red-500" },
    { name: "Green", value: "green", class: "bg-green-500" },
    { name: "Purple", value: "purple", class: "bg-purple-500" },
    { name: "Orange", value: "orange", class: "bg-orange-500" },
    { name: "Pink", value: "pink", class: "bg-pink-500" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Facebook className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SocialConnect
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for friends, posts, or pages..."
                className="pl-10 bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant={currentPage === "feed" ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigate("feed")}
              className="hidden sm:flex"
            >
              <Home className="h-4 w-4 mr-2" />
              Feed
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <Users className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">3</Badge>
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <MessageCircle className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">2</Badge>
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">5</Badge>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate("profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleThemeMode}>
                  {mode === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                  <span>{mode === "light" ? "Dark Mode" : "Light Mode"}</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette className="mr-2 h-4 w-4" />
                    <span>Theme Color</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {colorOptions.map((colorOption) => (
                      <DropdownMenuItem key={colorOption.value} onClick={() => handleColorChange(colorOption.value)}>
                        <div className={`mr-2 h-4 w-4 rounded-full ${colorOption.class}`} />
                        <span>{colorOption.name}</span>
                        {color === colorOption.value && <span className="ml-auto">✓</span>}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

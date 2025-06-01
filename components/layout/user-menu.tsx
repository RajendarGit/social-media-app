import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Palette, Moon, Settings, Sun, User } from "lucide-react"
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/authSlice'
import { setThemeColor } from '@/store/slices/themeSlice'
import { setThemeMode } from '@/store/slices/themeSlice'

const UserMenu = ({ onNavigate }: { onNavigate: () => void }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { mode, color } = useSelector((state: RootState) => state.theme)

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

  return <DropdownMenu>
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
    <DropdownMenuItem onClick={onNavigate}>
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
}

export default UserMenu
"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Bookmark, Clock, TrendingUp, MapPin, LinkIcon } from "lucide-react"

export default function LeftSidebar() {
  const { user } = useSelector((state: RootState) => state.auth)
  const { friends } = useSelector((state: RootState) => state.friends)

  const quickActions = [
    { icon: Users, label: "Friends", count: friends.length },
    { icon: Calendar, label: "Events", count: 3 },
    { icon: Bookmark, label: "Saved", count: 12 },
    { icon: Clock, label: "Memories", count: 5 },
    { icon: TrendingUp, label: "Trending", count: null },
  ]

  return (
    <div className="space-y-4">
      {/* User Profile Summary */}
      <Card className="overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute -bottom-6 left-4">
            <Avatar className="h-12 w-12 border-4 border-white">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardContent className="pt-8 pb-4">
          <h3 className="font-semibold text-lg">{user?.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{user?.bio}</p>

          {user?.location && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {user.location}
            </div>
          )}

          {user?.website && (
            <div className="flex items-center text-sm text-blue-600 mb-3">
              <LinkIcon className="h-4 w-4 mr-1" />
              <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {user.website.replace("https://", "")}
              </a>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <div className="text-center">
              <div className="font-semibold">{friends.length}</div>
              <div className="text-gray-500">Friends</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">127</div>
              <div className="text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">1.2k</div>
              <div className="text-gray-500">Followers</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Quick Access</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button key={index} variant="ghost" className="w-full justify-start h-auto p-3">
                <action.icon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                <span className="flex-1 text-left">{action.label}</span>
                {action.count && (
                  <Badge variant="secondary" className="ml-auto">
                    {action.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Online Friends */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Online Friends</h3>
          <div className="space-y-3">
            {friends
              .filter((f) => f.status === "online")
              .slice(0, 5)
              .map((friend) => (
                <div key={friend.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">{friend.name}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

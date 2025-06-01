"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store"
import { addFriend } from "@/store/slices/friendsSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Calendar, TrendingUp, Users } from "lucide-react"

export default function RightSidebar() {
  const dispatch = useDispatch()
  const { suggestedFriends } = useSelector((state: RootState) => state.friends)

  const handleAddFriend = (friend: any) => {
    dispatch(addFriend(friend))
  }

  const trendingTopics = [
    { tag: "#TechNews", posts: "12.5k posts" },
    { tag: "#Photography", posts: "8.2k posts" },
    { tag: "#Travel", posts: "15.1k posts" },
    { tag: "#Coding", posts: "6.8k posts" },
    { tag: "#Fitness", posts: "9.3k posts" },
  ]

  const upcomingEvents = [
    { name: "Tech Meetup", date: "Tomorrow", attendees: 45 },
    { name: "Photography Workshop", date: "This Weekend", attendees: 23 },
    { name: "Hiking Group", date: "Next Week", attendees: 12 },
  ]

  return (
    <div className="space-y-4">
      {/* Suggested Friends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            People You May Know
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedFriends.slice(0, 4).map((friend) => (
            <div key={friend.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{friend.name}</p>
                  <p className="text-xs text-gray-500">{friend.mutualFriends} mutual friends</p>
                </div>
              </div>
              <Button size="sm" onClick={() => handleAddFriend(friend)} className="bg-blue-600 hover:bg-blue-700">
                Add
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            See All Suggestions
          </Button>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg cursor-pointer"
            >
              <div>
                <p className="font-medium text-sm text-blue-600">{topic.tag}</p>
                <p className="text-xs text-gray-500">{topic.posts}</p>
              </div>
              <Badge variant="secondary">{index + 1}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <p className="font-medium text-sm">{event.name}</p>
              <p className="text-xs text-gray-500 mb-2">{event.date}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Users className="h-3 w-3 mr-1" />
                {event.attendees} attending
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

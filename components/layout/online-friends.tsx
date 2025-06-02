import React from 'react'
import { AvatarImage, AvatarFallback } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { Avatar } from '../ui/avatar'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const OnlineFriends = () => {
  const { friends } = useSelector((state: RootState) => state.friends)
  return (
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
  )
}

export default OnlineFriends

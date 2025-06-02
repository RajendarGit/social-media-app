import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Users } from "lucide-react";

const UpcomingEvents = () => {
  const upcomingEvents = [
    { name: "Tech Meetup", date: "Tomorrow", attendees: 45 },
    { name: "Photography Workshop", date: "This Weekend", attendees: 23 },
    { name: "Hiking Group", date: "Next Week", attendees: 12 },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingEvents.map((event, index) => (
          <div
            key={index}
            className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
          >
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
  );
};

export default UpcomingEvents;

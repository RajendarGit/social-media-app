import SuggestedFriends from "./suggested-friends";
import TrendingTopics from "./trending-topics";
import UpcomingEvents from "./upcoming-events";

export default function RightSidebar() {
  return (
    <div className="space-y-4">
      {/* Suggested Friends */}
      <SuggestedFriends />

      {/* Trending Topics */}
      <TrendingTopics />

      {/* Upcoming Events */}
      <UpcomingEvents />
    </div>
  );
}

import UserProfileSummary from "./user-profile-summary";
import QuickAction from "./quick-action";
import OnlineFriends from "./online-friends";
export default function LeftSidebar() {
  return (
    <div className="space-y-4">
      {/* User Profile Summary */}
      <UserProfileSummary />

      {/* Quick Actions */}
      <QuickAction />

      {/* Online Friends */}
      <OnlineFriends />
    </div>
  );
}

import { Button } from "../ui/button";
import { MessageCircle, Users, Bell, Home } from "lucide-react";
import { Badge } from "../ui/badge";

const NavigateButtons = ({ onNavigate, currentPage }: { onNavigate: () => void, currentPage: string }) => {
  return (
    <>
      <Button
        variant={currentPage === "feed" ? "default" : "ghost"}
        size="sm"
        onClick={() => onNavigate()}
        className="hidden sm:flex"
      >
        <Home className="h-4 w-4 mr-2" />
        Feed
      </Button>

      <Button variant="ghost" size="sm" className="relative">
        <Users className="h-4 w-4" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
          3
        </Badge>
      </Button>

      <Button variant="ghost" size="sm" className="relative">
        <MessageCircle className="h-4 w-4" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
          2
        </Badge>
      </Button>

      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-4 w-4" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
          5
        </Badge>
      </Button>
    </>
  );
};

export default NavigateButtons;

import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Bookmark, Clock, TrendingUp, Users, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const QuickAction = () => {
  const { friends } = useSelector((state: RootState) => state.friends);
  const quickActions = [
    { icon: Users, label: "Friends", count: friends.length },
    { icon: Calendar, label: "Events", count: 3 },
    { icon: Bookmark, label: "Saved", count: 12 },
    { icon: Clock, label: "Memories", count: 5 },
    { icon: TrendingUp, label: "Trending", count: null },
  ];
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3">Quick Access</h3>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto p-3"
            >
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
  );
};

export default QuickAction;

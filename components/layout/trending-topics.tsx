import React from "react";
import { CardHeader, CardTitle } from "../ui/card";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp } from "lucide-react";

const TrendingTopics = () => {
  const trendingTopics = [
    { tag: "React", posts: 150 },
    { tag: "JavaScript", posts: 120 },
    { tag: "Web Development", posts: 100 },
    { tag: "Programming", posts: 80 },
  ];
  return (
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
  );
};

export default TrendingTopics;

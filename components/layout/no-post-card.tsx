import React from "react";
import { Card, CardContent } from '../ui/card'

const NoPostYest = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Be the first to share something with your friends!
        </p>
      </CardContent>
    </Card>
  );
};

export default NoPostYest;

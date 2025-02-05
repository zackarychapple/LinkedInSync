import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Post, User } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface ActivitySectionProps {
  posts: Post[];
  user: User;
}

export default function ActivitySection({ posts, user }: ActivitySectionProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Activity</h2>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <p className="text-gray-500">No activity yet</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="pb-4 border-b last:border-b-0">
                <p className="text-sm text-gray-500 mb-2">
                  {user.name} posted • {" "}
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
                <p className="text-gray-800">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

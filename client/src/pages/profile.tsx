import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import ProfileHeader from "@/components/profile/profile-header";
import ActivitySection from "@/components/profile/activity-section";
import type { User, Post } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id);

  const { data: user, isLoading: loadingUser } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
  });

  const { data: posts, isLoading: loadingPosts } = useQuery<Post[]>({
    queryKey: [`/api/users/${userId}/posts`],
  });

  if (loadingUser || loadingPosts) {
    return (
      <div className="space-y-4 pt-14">
        <Card>
          <Skeleton className="h-48 w-full" />
          <CardContent className="relative pt-0">
            <Skeleton className="absolute -top-16 left-8 h-32 w-32 rounded-full" />
            <div className="ml-44 pt-4 pb-6">
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-6 w-32 mb-4" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || !posts) return null;

  return (
    <div className="pt-14">
      <ProfileHeader user={user} />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ActivitySection posts={posts} user={user} />
        </div>
        <div>
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Profile Strength</h2>
              <p className="text-sm text-gray-500">
                Add a summary and work experience to strengthen your profile.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

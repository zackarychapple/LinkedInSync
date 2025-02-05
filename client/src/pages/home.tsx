import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Image, FileText, Video } from "lucide-react";
import PostCard from "@/components/feed/post-card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import type { Post, User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [postContent, setPostContent] = useState("");
  const { toast } = useToast();
  
  const { data: users, isLoading: loadingUsers } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const { data: posts, isLoading: loadingPosts } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const createPost = useMutation({
    mutationFn: async (content: string) => {
      await apiRequest("POST", "/api/posts", {
        userId: 1, // For demo, hardcode to first user
        content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setPostContent("");
      toast({
        title: "Post created",
        description: "Your post has been shared with your network",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (loadingUsers || loadingPosts) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!users || !posts) return null;

  return (
    <div className="pt-14">
      <Card className="mb-4">
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={users[0].avatar} />
            </Avatar>
            <Textarea
              placeholder="What do you want to talk about?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="resize-none"
            />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Image className="h-5 w-5 mr-2" />
                Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Video className="h-5 w-5 mr-2" />
                Video
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <FileText className="h-5 w-5 mr-2" />
                Document
              </Button>
            </div>
            
            <Button 
              size="sm"
              disabled={!postContent.trim() || createPost.isPending}
              onClick={() => createPost.mutate(postContent)}
            >
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      <div className="space-y-4">
        {posts.map((post) => {
          const user = users.find((u) => u.id === post.userId);
          if (!user) return null;
          return <PostCard key={post.id} post={post} user={user} />;
        })}
      </div>
    </div>
  );
}

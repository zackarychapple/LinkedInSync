import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import type { Post, User } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  user: User;
}

export default function PostCard({ post, user }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <Card className="mb-4">
      <CardHeader className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} />
          </Avatar>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.headline}</p>
            <p className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
      </CardContent>
      
      <CardFooter className="p-0">
        <div className="w-full">
          <Separator />
          <div className="flex justify-between px-2">
            <Button 
              variant="ghost" 
              size="sm"
              className={`flex-1 gap-2 ${isLiked ? 'text-primary' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <ThumbsUp className="h-4 w-4" />
              Like
            </Button>
            
            <Button variant="ghost" size="sm" className="flex-1 gap-2">
              <MessageSquare className="h-4 w-4" />
              Comment
            </Button>
            
            <Button variant="ghost" size="sm" className="flex-1 gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

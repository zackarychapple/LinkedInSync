import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { PencilLine, MapPin } from "lucide-react";
import type { User } from "@shared/schema";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className="mb-4">
      <div className="h-48 overflow-hidden relative">
        <img
          src={user.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
        >
          <PencilLine className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="relative pt-0">
        <Avatar className="absolute -top-16 left-8 h-32 w-32 border-4 border-white">
          <AvatarImage src={user.avatar} />
        </Avatar>
        
        <div className="ml-44 pt-4 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.headline}</p>
              
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            </div>
            
            <Button>Connect</Button>
          </div>
          
          {user.bio && (
            <p className="mt-4 text-gray-700 whitespace-pre-line">{user.bio}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

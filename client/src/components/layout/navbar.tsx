import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  Bell, 
  MessageSquare, 
  Briefcase,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [location] = useLocation();
  
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="text-primary font-bold text-2xl">LinkedClone</a>
            </Link>
            
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-8"
              />
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <Link href="/">
              <a className={`flex flex-col items-center p-2 min-w-[4rem] ${
                location === "/" ? "text-primary" : "text-gray-500 hover:text-gray-900"
              }`}>
                <Home className="h-5 w-5" />
                <span className="text-xs mt-0.5">Home</span>
              </a>
            </Link>
            
            <Link href="/network">
              <a className={`flex flex-col items-center p-2 min-w-[4rem] ${
                location === "/network" ? "text-primary" : "text-gray-500 hover:text-gray-900"
              }`}>
                <Users className="h-5 w-5" />
                <span className="text-xs mt-0.5">Network</span>
              </a>
            </Link>

            <Button variant="ghost" className="flex flex-col items-center min-w-[4rem] h-auto py-2">
              <Briefcase className="h-5 w-5" />
              <span className="text-xs mt-0.5">Jobs</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center min-w-[4rem] h-auto py-2">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs mt-0.5">Messages</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center min-w-[4rem] h-auto py-2">
              <Bell className="h-5 w-5" />
              <span className="text-xs mt-0.5">Notifications</span>
            </Button>

            <Link href="/profile/1">
              <a className="flex flex-col items-center p-2 min-w-[4rem]">
                <Avatar className="h-5 w-5">
                  <AvatarImage src="https://images.unsplash.com/photo-1576558656222-ba66febe3dec" />
                </Avatar>
                <span className="text-xs mt-0.5">Me</span>
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

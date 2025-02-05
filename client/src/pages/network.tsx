import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { User, Connection } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Network() {
  const { data: users, isLoading: loadingUsers } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const { data: connections, isLoading: loadingConnections } = useQuery<Connection[]>({
    queryKey: ["/api/users/1/connections"], // For demo, hardcode to first user
  });

  if (loadingUsers || loadingConnections) {
    return (
      <div className="pt-14 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <Card className="h-fit">
          <CardContent className="p-4 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!users || !connections) return null;

  const pendingConnections = connections.filter(c => c.status === "pending");
  const connectedUsers = connections
    .filter(c => c.status === "accepted")
    .map(c => {
      // Find the other user in the connection
      const otherId = c.userId === 1 ? c.connectedUserId : c.userId;
      return users.find(u => u.id === otherId);
    })
    .filter((u): u is User => !!u);

  return (
    <div className="pt-14 grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">People you may know</h2>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {users
              .filter(u => 
                u.id !== 1 && // Filter out current user
                !connections.some(c => 
                  (c.userId === 1 && c.connectedUserId === u.id) ||
                  (c.userId === u.id && c.connectedUserId === 1)
                )
              )
              .map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={user.avatar} />
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{user.headline}</p>
                        <Button size="sm">Connect</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Pending Invitations</h2>
            {pendingConnections.length === 0 ? (
              <p className="text-sm text-gray-500">No pending invitations</p>
            ) : (
              <div className="space-y-4">
                {pendingConnections.map((conn) => {
                  const user = users.find(u => 
                    u.id === (conn.userId === 1 ? conn.connectedUserId : conn.userId)
                  );
                  if (!user) return null;
                  return (
                    <div key={conn.id} className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} />
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.headline}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4">Your Network</h2>
            <div className="space-y-4">
              {connectedUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} />
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.headline}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

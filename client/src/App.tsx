import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/layout/navbar";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Network from "./pages/network";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/profile/:id" component={Profile}/>
          <Route path="/network" component={Network}/>
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

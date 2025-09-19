import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { RouteCard } from "./RouteCard";
import { Route } from "@/data/mockData";

interface RouteListProps {
  routes: Route[];
  onRouteClick: (routeId: number) => void;
}

export const RouteList = ({ routes, onRouteClick }: RouteListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoutes = routes.filter(route =>
    route.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search routes by name or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoutes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            onClick={() => onRouteClick(route.id)}
          />
        ))}
      </div>
      
      {filteredRoutes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No routes found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};
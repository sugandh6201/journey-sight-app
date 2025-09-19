import { useState } from "react";
import { RouteCard } from "./RouteCard";
import { Input } from "@/components/ui/input";
import { Route } from "@/data/mockData";

interface RouteListProps {
  routes: Route[];
  onRouteClick: (routeId: number) => void;
}

export const RouteList = ({ routes, onRouteClick }: RouteListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoutes = routes.filter(route =>
    route.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Search routes by number or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="text-sm text-muted-foreground">
          Showing {filteredRoutes.length} of {routes.length} routes
        </div>
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
        <div className="card">
          <div className="card-content text-center py-12">
            <div className="text-muted-foreground mb-2">No routes found</div>
            <div className="text-sm text-muted-foreground">
              Try adjusting your search query
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Clock } from "lucide-react";
import { Route } from "@/data/mockData";

interface RouteCardProps {
  route: Route;
  onClick: () => void;
}

export const RouteCard = ({ route, onClick }: RouteCardProps) => {
  const getStatusColor = (status: Route['status']) => {
    switch (status) {
      case 'On Time':
        return 'bg-success text-success-foreground';
      case 'Delayed':
        return 'bg-warning text-warning-foreground';
      case 'Cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow duration-200 border-l-4 border-l-primary"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg text-primary">{route.number}</span>
          </div>
          <Badge className={getStatusColor(route.status)}>
            {route.status}
          </Badge>
        </div>
        <h3 className="font-semibold text-foreground mb-1">{route.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{route.stops.length} stops</span>
        </div>
      </CardContent>
    </Card>
  );
};
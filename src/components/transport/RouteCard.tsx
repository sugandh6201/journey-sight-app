import { Badge } from "@/components/ui/badge";
import { Route } from "@/data/mockData";

interface RouteCardProps {
  route: Route;
  onClick: () => void;
}

const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'on time':
      return 'success';
    case 'delayed':
      return 'warning';
    case 'cancelled':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export const RouteCard = ({ route, onClick }: RouteCardProps) => {
  return (
    <div 
      className="card transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
      onClick={onClick}
      style={{ borderLeft: '4px solid var(--primary)' }}
    >
      <div className="card-content">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-primary">{route.number}</h3>
          <Badge variant={getStatusBadgeVariant(route.status)}>
            {route.status}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4">{route.name}</p>
        <div className="text-sm text-muted-foreground">
          {route.stops.length} stops • Click to view details
        </div>
      </div>
    </div>
  );
};
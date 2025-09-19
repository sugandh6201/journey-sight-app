import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Route, Stop, Arrival } from "@/data/mockData";

interface StopListProps {
  route: Route;
  stops: Stop[];
  arrivals: Arrival[];
  onBack: () => void;
  onStopClick: (stopId: number) => void;
}

export const StopList = ({ route, stops, arrivals, onBack, onStopClick }: StopListProps) => {
  const routeStops = stops.filter(stop => 
    route.stops.includes(stop.id)
  );

  const getNextArrival = (stopId: number) => {
    const stopArrivals = arrivals
      .filter(arrival => arrival.stopId === stopId && arrival.routeId === route.id)
      .sort((a, b) => a.minutes - b.minutes);
    return stopArrivals[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-2xl font-bold">{route.number}</h2>
            <Badge variant="secondary">{route.status}</Badge>
          </div>
          <p className="text-muted-foreground">{route.name}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Routes
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {routeStops.map((stop, index) => {
          const nextArrival = getNextArrival(stop.id);
          
          return (
            <div
              key={stop.id}
              className="card transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
              onClick={() => onStopClick(stop.id)}
            >
              <div className="card-content">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                      borderRadius: '50%',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">{stop.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Stop ID: {stop.id}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    {nextArrival ? (
                      <div>
                        <div className="text-xl font-bold text-primary">
                          {nextArrival.minutes} min
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Bus {nextArrival.busId}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No arrivals
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
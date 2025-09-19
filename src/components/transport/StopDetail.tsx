import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stop, Route, Arrival } from "@/data/mockData";

interface StopDetailProps {
  stop: Stop;
  routes: Route[];
  arrivals: Arrival[];
  onBack: () => void;
}

export const StopDetail = ({ stop, routes, arrivals, onBack }: StopDetailProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(timer);
  }, []);

  const getStopArrivals = () => {
    return arrivals
      .filter(arrival => arrival.stopId === stop.id)
      .sort((a, b) => a.minutes - b.minutes)
      .slice(0, 3) // Show next 3 arrivals
      .map(arrival => {
        const route = routes.find(r => r.id === arrival.routeId);
        return {
          ...arrival,
          route
        };
      });
  };

  const stopRoutes = routes.filter(route => 
    route.stops.includes(stop.id)
  );

  const nextArrivals = getStopArrivals();

  const formatTime = (minutes: number) => {
    if (minutes <= 0) return "Due";
    if (minutes === 1) return "1 min";
    return `${minutes} mins`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{stop.name}</h2>
          <p className="text-muted-foreground">
            Stop ID: {stop.id} • Updated: {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Next Arrivals</h3>
          </div>
          <div className="card-content">
            {nextArrivals.length > 0 ? (
              <div className="space-y-4">
                {nextArrivals.map((arrival, index) => (
                  <div key={`${arrival.routeId}-${arrival.busId}`} 
                       className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.5rem',
                        height: '2.5rem',
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                        borderRadius: '50%',
                        fontSize: '0.875rem',
                        fontWeight: '700'
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{arrival.route?.number}</div>
                        <div className="text-sm text-muted-foreground">
                          {arrival.route?.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Bus {arrival.busId}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div className="text-xl font-bold text-primary">
                        {formatTime(arrival.minutes)}
                      </div>
                      {arrival.route && (
                        <Badge variant="secondary">
                          {arrival.route.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No upcoming arrivals
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Bus, Clock } from "lucide-react";
import { Stop, Route, Arrival } from "@/data/mockData";

interface StopDetailProps {
  stop: Stop;
  routes: Route[];
  arrivals: Arrival[];
  onBack: () => void;
}

export const StopDetail = ({ stop, routes, arrivals, onBack }: StopDetailProps) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStopArrivals = () => {
    return arrivals
      .filter(arrival => arrival.stopId === stop.id)
      .sort((a, b) => a.minutes - b.minutes)
      .slice(0, 3); // Next 3 arrivals
  };

  const getRoute = (routeId: number) => {
    return routes.find(route => route.id === routeId);
  };

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

  const formatCountdown = (minutes: number) => {
    if (minutes <= 0) return "Arriving";
    if (minutes === 1) return "1 min";
    return `${minutes} mins`;
  };

  const nextArrivals = getStopArrivals();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            {stop.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">Stop #{stop.id}</p>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Next Arrivals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {nextArrivals.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No upcoming arrivals
            </p>
          ) : (
            nextArrivals.map((arrival, index) => {
              const route = getRoute(arrival.routeId);
              if (!route) return null;
              
              return (
                <div
                  key={`${arrival.routeId}-${arrival.busId}-${index}`}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Bus className="h-5 w-5 text-primary" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{route.number}</span>
                        <Badge className={getStatusColor(route.status)}>
                          {route.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {route.name} • Bus {arrival.busId}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-primary">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold text-lg">
                      {formatCountdown(arrival.minutes)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Routes Serving This Stop</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {stop.routes.map((routeId) => {
              const route = getRoute(routeId);
              if (!route) return null;
              
              return (
                <Badge key={routeId} variant="outline" className="text-primary border-primary">
                  {route.number}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
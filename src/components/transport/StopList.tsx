import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import { Route, Stop, Arrival } from "@/data/mockData";

interface StopListProps {
  route: Route;
  stops: Stop[];
  arrivals: Arrival[];
  onBack: () => void;
  onStopClick: (stopId: number) => void;
}

export const StopList = ({ route, stops, arrivals, onBack, onStopClick }: StopListProps) => {
  const getNextArrival = (stopId: number) => {
    const stopArrivals = arrivals
      .filter(arrival => arrival.stopId === stopId && arrival.routeId === route.id)
      .sort((a, b) => a.minutes - b.minutes);
    
    return stopArrivals[0];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Routes
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">{route.number} - {route.name}</CardTitle>
        </CardHeader>
      </Card>
      
      <div className="space-y-3">
        {stops
          .filter(stop => route.stops.includes(stop.id))
          .map((stop) => {
            const nextArrival = getNextArrival(stop.id);
            
            return (
              <Card 
                key={stop.id}
                className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={() => onStopClick(stop.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{stop.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Stop #{stop.id}
                        </p>
                      </div>
                    </div>
                    
                    {nextArrival && (
                      <div className="flex items-center gap-2 text-primary">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">
                          {nextArrival.minutes} min
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};
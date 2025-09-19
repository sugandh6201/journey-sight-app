import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RouteList } from "./RouteList";
import { StopList } from "./StopList";
import { StopDetail } from "./StopDetail";
import { TransportMap } from "./TransportMap";
import { mockRoutes, mockStops, mockArrivals, mockBuses } from "@/data/mockData";

type ViewState = 
  | { type: 'routes' }
  | { type: 'route-stops'; routeId: number }
  | { type: 'stop-detail'; stopId: number };

export const Dashboard = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'routes' });

  const handleRouteClick = (routeId: number) => {
    setViewState({ type: 'route-stops', routeId });
  };

  const handleStopClick = (stopId: number) => {
    setViewState({ type: 'stop-detail', stopId });
  };

  const handleBack = () => {
    if (viewState.type === 'route-stops') {
      setViewState({ type: 'routes' });
    } else if (viewState.type === 'stop-detail') {
      setViewState({ type: 'routes' });
    }
  };

  const renderMainContent = () => {
    switch (viewState.type) {
      case 'routes':
        return (
          <RouteList 
            routes={mockRoutes} 
            onRouteClick={handleRouteClick}
          />
        );
      
      case 'route-stops':
        const route = mockRoutes.find(r => r.id === viewState.routeId);
        if (!route) return <div>Route not found</div>;
        
        return (
          <StopList
            route={route}
            stops={mockStops}
            arrivals={mockArrivals}
            onBack={handleBack}
            onStopClick={handleStopClick}
          />
        );
      
      case 'stop-detail':
        const stop = mockStops.find(s => s.id === viewState.stopId);
        if (!stop) return <div>Stop not found</div>;
        
        return (
          <StopDetail
            stop={stop}
            routes={mockRoutes}
            arrivals={mockArrivals}
            onBack={handleBack}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Public Transport Tracker
        </h1>
        <p className="text-muted-foreground">
          Real-time bus tracking and arrival information
        </p>
      </div>

      <Tabs defaultValue="routes" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="routes">Routes & Stops</TabsTrigger>
          <TabsTrigger value="map">Live Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="routes" className="mt-6">
          {renderMainContent()}
        </TabsContent>
        
        <TabsContent value="map" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Transport Map</CardTitle>
              <p className="text-sm text-muted-foreground">
                Click on stop markers to see arrival information
              </p>
            </CardHeader>
            <CardContent>
              <TransportMap
                stops={mockStops}
                buses={mockBuses}
                arrivals={mockArrivals}
                routes={mockRoutes}
                onStopClick={handleStopClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
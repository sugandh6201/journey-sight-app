import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Stop, Bus, Arrival, Route } from '@/data/mockData';

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface TransportMapProps {
  stops: Stop[];
  buses: Bus[];
  arrivals: Arrival[];
  routes: Route[];
  onStopClick: (stopId: number) => void;
}

export const TransportMap = ({ stops, buses, arrivals, routes, onStopClick }: TransportMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [busPositions, setBusPositions] = useState(buses);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([40.7128, -74.0060], 11);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create custom icons
    const stopIcon = L.divIcon({
      className: 'custom-stop-marker',
      html: '<div style="background-color: #2563eb; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const busIcon = L.divIcon({
      className: 'custom-bus-marker',
      html: '<div style="background-color: #dc2626; width: 8px; height: 8px; border-radius: 50%; border: 1px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.3);"></div>',
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    });

    // Add stop markers
    stops.forEach(stop => {
      const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon })
        .addTo(map);
      
      // Get next arrival for this stop
      const nextArrival = arrivals
        .filter(arrival => arrival.stopId === stop.id)
        .sort((a, b) => a.minutes - b.minutes)[0];
      
      const route = nextArrival ? routes.find(r => r.id === nextArrival.routeId) : null;
      
      const popupContent = `
        <div style="font-family: system-ui, sans-serif; min-width: 150px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">${stop.name}</h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">Stop #${stop.id}</p>
          ${nextArrival && route ? 
            `<div style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f3f4f6; border-radius: 6px;">
              <span style="font-weight: 600; color: #2563eb;">${route.number}</span>
              <span style="font-size: 14px; color: #374151;">${nextArrival.minutes} min</span>
            </div>` : 
            '<p style="color: #6b7280; font-size: 12px;">No upcoming arrivals</p>'
          }
        </div>
      `;
      
      marker.bindPopup(popupContent);
      marker.on('click', () => onStopClick(stop.id));
      
      markersRef.current[`stop-${stop.id}`] = marker;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [stops, arrivals, routes, onStopClick]);

  // Animate buses
  useEffect(() => {
    const interval = setInterval(() => {
      setBusPositions(prevBuses => 
        prevBuses.map(bus => {
          // Simple animation - move buses slightly in their direction
          const moveDistance = 0.001; // Small movement
          const radians = (bus.direction * Math.PI) / 180;
          
          return {
            ...bus,
            lat: bus.lat + Math.sin(radians) * moveDistance,
            lng: bus.lng + Math.cos(radians) * moveDistance,
          };
        })
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Update bus markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const busIcon = L.divIcon({
      className: 'custom-bus-marker',
      html: '<div style="background-color: #dc2626; width: 8px; height: 8px; border-radius: 50%; border: 1px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.3);"></div>',
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    });

    // Remove existing bus markers
    Object.keys(markersRef.current).forEach(key => {
      if (key.startsWith('bus-')) {
        markersRef.current[key].remove();
        delete markersRef.current[key];
      }
    });

    // Add new bus markers
    busPositions.forEach(bus => {
      const route = routes.find(r => r.id === bus.routeId);
      const marker = L.marker([bus.lat, bus.lng], { icon: busIcon })
        .addTo(mapInstanceRef.current!);
      
      marker.bindPopup(`
        <div style="font-family: system-ui, sans-serif;">
          <h4 style="margin: 0 0 4px 0; color: #1f2937;">Bus ${bus.id}</h4>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">${route?.number || 'Unknown Route'}</p>
        </div>
      `);
      
      markersRef.current[`bus-${bus.id}`] = marker;
    });
  }, [busPositions, routes]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-96 rounded-lg shadow-lg border"
      style={{ minHeight: '400px' }}
    />
  );
};
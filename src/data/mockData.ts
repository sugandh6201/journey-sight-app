export interface Route {
  id: number;
  number: string;
  name: string;
  status: 'On Time' | 'Delayed' | 'Cancelled';
  stops: number[];
}

export interface Stop {
  id: number;
  name: string;
  lat: number;
  lng: number;
  routes: number[];
}

export interface Arrival {
  stopId: number;
  routeId: number;
  minutes: number;
  busId: string;
}

export interface Bus {
  id: string;
  routeId: number;
  lat: number;
  lng: number;
  direction: number; // angle in degrees
}

export const mockRoutes: Route[] = [
  {
    id: 1,
    number: "Bus 42",
    name: "City Center - Airport",
    status: "On Time",
    stops: [1, 2, 3, 4, 5]
  },
  {
    id: 2,
    number: "Bus 15",
    name: "Downtown Loop",
    status: "Delayed",
    stops: [2, 6, 7, 8, 2]
  },
  {
    id: 3,
    number: "Bus 8",
    name: "University District",
    status: "On Time",
    stops: [9, 10, 11, 12]
  },
  {
    id: 4,
    number: "Bus 23",
    name: "Harbor - Mall",
    status: "Cancelled",
    stops: [13, 14, 15, 16]
  },
  {
    id: 5,
    number: "Bus 91",
    name: "Express North",
    status: "On Time",
    stops: [1, 17, 18, 19]
  }
];

export const mockStops: Stop[] = [
  { id: 1, name: "Central Station", lat: 40.7128, lng: -74.0060, routes: [1, 5] },
  { id: 2, name: "Main Street", lat: 40.7589, lng: -73.9851, routes: [1, 2] },
  { id: 3, name: "Park Avenue", lat: 40.7505, lng: -73.9934, routes: [1] },
  { id: 4, name: "Broadway", lat: 40.7505, lng: -73.9857, routes: [1] },
  { id: 5, name: "Airport Terminal", lat: 40.6892, lng: -74.1745, routes: [1] },
  { id: 6, name: "City Hall", lat: 40.7127, lng: -74.0059, routes: [2] },
  { id: 7, name: "Times Square", lat: 40.7580, lng: -73.9855, routes: [2] },
  { id: 8, name: "Union Square", lat: 40.7359, lng: -73.9911, routes: [2] },
  { id: 9, name: "University Gate", lat: 40.8075, lng: -73.9626, routes: [3] },
  { id: 10, name: "Library", lat: 40.8115, lng: -73.9626, routes: [3] },
  { id: 11, name: "Student Center", lat: 40.8155, lng: -73.9626, routes: [3] },
  { id: 12, name: "Medical Center", lat: 40.8195, lng: -73.9626, routes: [3] },
  { id: 13, name: "Harbor View", lat: 40.7074, lng: -74.0113, routes: [4] },
  { id: 14, name: "Pier 17", lat: 40.7063, lng: -74.0028, routes: [4] },
  { id: 15, name: "Shopping Plaza", lat: 40.7489, lng: -73.9680, routes: [4] },
  { id: 16, name: "Metro Mall", lat: 40.7614, lng: -73.9776, routes: [4] },
  { id: 17, name: "North Bridge", lat: 40.7831, lng: -73.9712, routes: [5] },
  { id: 18, name: "Riverside Park", lat: 40.7954, lng: -73.9712, routes: [5] },
  { id: 19, name: "North Terminal", lat: 40.8176, lng: -73.9712, routes: [5] }
];

export const mockArrivals: Arrival[] = [
  { stopId: 1, routeId: 1, minutes: 3, busId: "B101" },
  { stopId: 1, routeId: 5, minutes: 8, busId: "B501" },
  { stopId: 1, routeId: 1, minutes: 18, busId: "B102" },
  { stopId: 2, routeId: 1, minutes: 5, busId: "B101" },
  { stopId: 2, routeId: 2, minutes: 12, busId: "B201" },
  { stopId: 2, routeId: 1, minutes: 20, busId: "B102" },
  { stopId: 3, routeId: 1, minutes: 7, busId: "B101" },
  { stopId: 4, routeId: 1, minutes: 10, busId: "B101" },
  { stopId: 6, routeId: 2, minutes: 2, busId: "B201" },
  { stopId: 7, routeId: 2, minutes: 6, busId: "B201" },
  { stopId: 9, routeId: 3, minutes: 4, busId: "B301" },
  { stopId: 10, routeId: 3, minutes: 8, busId: "B301" }
];

export const mockBuses: Bus[] = [
  { id: "B101", routeId: 1, lat: 40.7400, lng: -74.0000, direction: 45 },
  { id: "B201", routeId: 2, lat: 40.7300, lng: -73.9900, direction: 180 },
  { id: "B301", routeId: 3, lat: 40.8100, lng: -73.9620, direction: 90 }
];
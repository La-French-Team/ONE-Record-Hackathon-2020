import { flights, routes } from 'assets';
import vaccines from './057-35635677.json';
import chickens from './220-58358322.json';

const extractFlightPoints = (points) =>
  points.result.response.data.flight.track.map((point) => ({
    pos: [point.longitude, point.latitude],
    hdg: point.heading,
  }));

const extractRoutePoints = (route) => route.coordinates.map((coordinate) => ({ pos: coordinate, hdg: null }));

const mockedData = {
  '057-35635677': {
    data: vaccines,
    playbacks: [
      [], // Departure
      [], // Truck
      extractRoutePoints(routes.LeTraitCDG), // CDG
      [], // Truck
      // [],
      // [],
      extractRoutePoints(routes.CDGAMS), // AMS
      [], // Flight
      // [],
      // [],
      // [],
      extractFlightPoints(flights.KL643), // JFK
      [], // Truck
      extractRoutePoints(routes.JFKJFK),
      // [],
      extractRoutePoints(routes.JFKNewYork),
      [],
    ],
    steps: ['Departure', 'Truck', 'CDG', 'Truck', 'AMS', 'Plane', 'JFK', 'Truck', 'Agent', 'Truck', 'Arrival'],
  },
  '220-58358322': {
    data: chickens,
    playbacks: [
      [], // Departure
      [], // Truck
      extractRoutePoints(routes.BabberichFRA), // FRA
      [], // Flight
      extractFlightPoints(flights.LH8290), // CAI
      [], // Truck
      extractRoutePoints(routes.CAIFarm),
      [], // Arrival
    ],

    steps: ['Departure', 'Truck', 'FRA', 'Plane', 'CAI', 'Truck', 'Arrival'],
  },
};

export default mockedData;

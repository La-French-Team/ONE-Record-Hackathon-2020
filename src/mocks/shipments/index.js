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
      extractRoutePoints(routes.CDGAMS), // AMS
      [], // Flight
      extractFlightPoints(flights.KL643), // JFK
      [], // Truck
      extractRoutePoints(routes.JFKJFK),
      extractRoutePoints(routes.JFKNewYork),
      [],
    ],
    steps: [
      { label: 'Departure', stepIndex: 0 },
      { label: 'Truck', stepIndex: 1 },
      { label: 'CDG', stepIndex: 2 },
      { label: 'Truck', stepIndex: 5 },
      { label: 'AMS', stepIndex: 7 },
      { label: 'Plane', stepIndex: 10 },
      { label: 'JFK', stepIndex: 11 },
      { label: 'Truck', stepIndex: 12 },
      { label: 'Agent', stepIndex: 13 },
      { label: 'Truck', stepIndex: 14 },
      { label: 'Arrival', stepIndex: 15 },
    ],
    ulds: ['https://onerecord.fr:8083/companies/airfrance/los/Uld_195302'],
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

    steps: [
      { label: 'Departure', stepIndex: 0 },
      { label: 'Truck', stepIndex: 1 },
      { label: 'FRA', stepIndex: 2 },
      { label: 'Plane', stepIndex: 6 },
      { label: 'CAI', stepIndex: 7 },
      { label: 'Truck', stepIndex: 8 },
      { label: 'Arrival', stepIndex: 9 },
    ],
    ulds: ['https://onerecord.fr:8083/companies/lufthansa/los/Uld_834951'],
  },
};

export default mockedData;

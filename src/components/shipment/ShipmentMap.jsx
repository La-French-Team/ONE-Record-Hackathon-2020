import Map from 'components/stats/Map/Map';
import React from 'react';
import { flights, routes } from 'assets';

export default function ShipmentMap({ airWayBill }) {
  // A location might be an airplane ID (e.g. KL643)
  const locations = airWayBill.map((step) => step.location.type);

  // Retrieve flight playbacks by ID (e.g. KL643)
  const flightPlaybacks = Object.entries(flights)
    .filter(([key]) => locations.includes(key))
    // Retrieve flightPlayback data
    .map(([, value]) => value);

  const routePlaybacks = Object.values(routes);

  return <Map flights={flightPlaybacks} routes={routePlaybacks} interests={airWayBill} />;
}

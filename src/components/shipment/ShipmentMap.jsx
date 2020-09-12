import Map from 'components/stats/Map/Map';
import React from 'react';
import { flights } from 'assets';

export default function ShipmentMap({ airWayBill }) {
  // A location might be an airplane ID (e.g. KL643)
  const locations = airWayBill.map((step) => step.location.type);

  // Retrieve flight playbacks by ID (e.g. KL643)
  const flightPlaybacks = Object.entries(flights).filter(([key]) => locations.includes(key));
  // Retrieve flightPlayback data
  const routes = flightPlaybacks.map(([, value]) => value);

  return <Map routes={routes} interests={airWayBill} />;
}

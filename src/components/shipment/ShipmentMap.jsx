import Map from 'components/stats/Map/Map';
import React from 'react';
import { flights } from 'assets';

export default function ShipmentMap({ airWayBill }) {
  console.table(airWayBill);
  console.table(flights);
  const locations = airWayBill.map((step) => step.location.type);
  const flightPlaybacks = Object.entries(flights).filter(([key, value]) => locations.includes(key));
  console.log(flightPlaybacks);
  return <Map routes={flightPlaybacks.map(([key, value]) => value)} />;
}
